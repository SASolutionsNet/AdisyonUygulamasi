using BillApp.Application.Interfaces;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Services;
using BillApp.Domain.User;
using BillApp.Infrastructure.Contexts;
using BillApp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BillApp.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure DbContext and Factory
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            // Configure Identity
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddApiEndpoints();


            // Configure Authentication & JWT
            var jwtSettings = configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var tokenService = context.HttpContext.RequestServices.GetRequiredService<ITokenService>();
                        var jwtToken = context.SecurityToken as JwtSecurityToken;

                        if (jwtToken != null && (await tokenService.IsTokenRevoked(jwtToken.RawData)).Data)
                        {
                            context.Fail("Token has been revoked.");
                        }
                    }
                };
            });

            // Configure Authorization
            services.AddAuthorization();

            // Add HttpContext Accessor & AutoMapper
            services.AddHttpContextAccessor();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Register Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBillRepository, BillRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();

            // Register Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IBillService, BillService>();
            services.AddScoped<IOrderService, OrderService>();

            return services;
        }
    }
}

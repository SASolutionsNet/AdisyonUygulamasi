using BussinesApplication.WebAPI.Bussines.Services.Abstract;
using BussinesApplication.WebAPI.Bussines.Services.Concrete;
using BussinesApplication.WebAPI.DataAcces;
using BussinesApplication.WebAPI.DataAcces.Repositories.Abstract;
using BussinesApplication.WebAPI.DataAcces.Repositories.Interface;
using BussinesApplication.WebAPI.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// AddScoped --> bir kere buileder her istendiðinde buildleri daðýtýr


builder.Services.AddScoped<IGenericRepository<Post>, GenericRepository<Post>>();
builder.Services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();


builder.Services.AddScoped<IBaseService<Post>, BaseService<Post>>();
builder.Services.AddScoped<IBaseService<User>, BaseService<User>>();



builder.Services.AddDbContext<DataContext>(x =>
    x.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        option =>
        {
            option.MigrationsAssembly(Assembly.GetAssembly(typeof(DataContext))?.GetName().Name);
        }
    ));


// CORS'u yapılandırın builder.Services.AddCors(options => { options.AddPolicy("AllowAngular", policy => policy.WithOrigins("http://localhost:4200") // Angular uygulamanızın URL'si .AllowAnyMethod() .AllowAnyHeader()); });



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.Migrate();
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

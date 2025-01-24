using BillApp.Infrastructure.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BillApp.Infrastructure.Extensions
{
    public static class MigrateExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using ApplicationDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            context.Database.Migrate();
        }

    }
}

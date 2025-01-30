using BillApp.Domain.Category;
using BillApp.Domain.RevokedToken;
using BillApp.Domain.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BillApp.Infrastructure.Contexts
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => base.Users;
        public DbSet<Category> Categories { get; set; } = null;
        public DbSet<RevokedToken> RevokedTokens { get; set; } = null;

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasDefaultSchema("User");

            //These features can be moved to a mapping class
            builder.Entity<User>().Property(u => u.Role).HasMaxLength(10);
            builder.Entity<User>().Property(u => u.AppCode).HasMaxLength(10);

            builder.Entity<Category>().ToTable("Category", "BillApp").HasQueryFilter(x => x.IsDel == false);

            builder.Entity<RevokedToken>().ToTable("RevokedTokens", "User");

        }
    }
}

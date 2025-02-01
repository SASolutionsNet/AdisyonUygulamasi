using BillApp.Application.Interfaces;
using BillApp.Domain.Bill;
using BillApp.Domain.Category;
using BillApp.Domain.Order;
using BillApp.Domain.Product;
using BillApp.Domain.RevokedToken;
using BillApp.Domain.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace BillApp.Infrastructure.Contexts
{
    public class ApplicationDbContext : IdentityDbContext<User>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => base.Users;
        public DbSet<Category> Categories { get; set; }
        public DbSet<RevokedToken> RevokedTokens { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Order> Orders{ get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasDefaultSchema("User");

            //can be moved to a mapping class
            builder.Entity<User>().Property(u => u.Role).HasMaxLength(10);
            builder.Entity<User>().Property(u => u.AppCode).HasMaxLength(10);

            builder.Entity<Category>().ToTable("Category", "BillApp").HasQueryFilter(x => x.IsDel == false);

            builder.Entity<Product>().ToTable("Product", "BillApp").HasQueryFilter(x => x.IsDel == false);
            builder.Entity<Product>()
                .HasOne(p => p.Category) // Product has one Category
                .WithMany(c => c.Products) // Category has many Products
                .HasForeignKey(p => p.CategoryId) // Foreign key setup
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete if needed

            builder.Entity<Bill>().ToTable("Bill", "BillApp").HasQueryFilter(x => x.IsDel == false);

            builder.Entity<Order>().ToTable("Order", "BillApp").HasQueryFilter(x => x.IsDel == false);


            builder.Entity<Order>()
                .HasOne(o => o.Bill)
                .WithMany(b => b.Orders) // A Bill can have multiple Orders
                .HasForeignKey(o => o.BillId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Order>()
                .HasOne(o => o.Product)
                .WithMany() // A Product can be part of multiple Orders
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<RevokedToken>().ToTable("RevokedTokens", "User");

        }
    }
}

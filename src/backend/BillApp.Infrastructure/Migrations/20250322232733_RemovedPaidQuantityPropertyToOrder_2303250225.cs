using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BillApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedPaidQuantityPropertyToOrder_2303250225 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidQuantity",
                schema: "BillApp",
                table: "Order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaidQuantity",
                schema: "BillApp",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}

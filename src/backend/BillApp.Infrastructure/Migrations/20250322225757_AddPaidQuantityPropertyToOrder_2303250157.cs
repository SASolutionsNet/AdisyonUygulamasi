using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BillApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPaidQuantityPropertyToOrder_2303250157 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaidQuantity",
                schema: "BillApp",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidQuantity",
                schema: "BillApp",
                table: "Order");
        }
    }
}

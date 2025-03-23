using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BillApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedIsPaidPropertyToOrder_2303250235 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaid",
                schema: "BillApp",
                table: "Order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                schema: "BillApp",
                table: "Order",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}

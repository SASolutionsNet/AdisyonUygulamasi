using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BillApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentMethodColumnsAdded_2403252019 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "CashPaidTotalPrice",
                schema: "BillApp",
                table: "Bill",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "CreditCardPaidTotalPrice",
                schema: "BillApp",
                table: "Bill",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CashPaidTotalPrice",
                schema: "BillApp",
                table: "Bill");

            migrationBuilder.DropColumn(
                name: "CreditCardPaidTotalPrice",
                schema: "BillApp",
                table: "Bill");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Resist.Migrations
{
    public partial class altermissionsmissionnumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MissionNumber",
                table: "Mission",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MissionNumber",
                table: "Mission");
        }
    }
}

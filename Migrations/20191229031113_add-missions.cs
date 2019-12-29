using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Resist.Migrations
{
    public partial class addmissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GameUser_GameId",
                table: "GameUser");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_GameUser_GameId_UserId",
                table: "GameUser",
                columns: new[] { "GameId", "UserId" });

            migrationBuilder.CreateTable(
                name: "Mission",
                columns: table => new
                {
                    MissionId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Status = table.Column<int>(nullable: false),
                    GameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mission", x => x.MissionId);
                    table.ForeignKey(
                        name: "FK_Mission_Game_GameId",
                        column: x => x.GameId,
                        principalTable: "Game",
                        principalColumn: "GameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameUserMission",
                columns: table => new
                {
                    GameUserMissionId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    GameUserId = table.Column<int>(nullable: false),
                    MissionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameUserMission", x => x.GameUserMissionId);
                    table.UniqueConstraint("AK_GameUserMission_GameUserId_MissionId", x => new { x.GameUserId, x.MissionId });
                    table.ForeignKey(
                        name: "FK_GameUserMission_GameUser_GameUserId",
                        column: x => x.GameUserId,
                        principalTable: "GameUser",
                        principalColumn: "GameUserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameUserMission_Mission_MissionId",
                        column: x => x.MissionId,
                        principalTable: "Mission",
                        principalColumn: "MissionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameUserMission_MissionId",
                table: "GameUserMission",
                column: "MissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Mission_GameId",
                table: "Mission",
                column: "GameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameUserMission");

            migrationBuilder.DropTable(
                name: "Mission");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_GameUser_GameId_UserId",
                table: "GameUser");

            migrationBuilder.CreateIndex(
                name: "IX_GameUser_GameId",
                table: "GameUser",
                column: "GameId");
        }
    }
}

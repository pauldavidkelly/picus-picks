﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Picus.Api.Migrations
{
    /// <inheritdoc />
    public partial class RenameEspnGameId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Teams_WinningTeamId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Games_GameId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Teams_SelectedTeamId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Users_UserId",
                table: "Picks");

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.AddColumn<int>(
                name: "GameId1",
                table: "Picks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Picks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Picks",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Picks_GameId1",
                table: "Picks",
                column: "GameId1");

            migrationBuilder.CreateIndex(
                name: "IX_Picks_TeamId",
                table: "Picks",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Picks_UserId1",
                table: "Picks",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Teams_WinningTeamId",
                table: "Games",
                column: "WinningTeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Games_GameId",
                table: "Picks",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Games_GameId1",
                table: "Picks",
                column: "GameId1",
                principalTable: "Games",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Teams_SelectedTeamId",
                table: "Picks",
                column: "SelectedTeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Teams_TeamId",
                table: "Picks",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Users_UserId",
                table: "Picks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Users_UserId1",
                table: "Picks",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Teams_WinningTeamId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Games_GameId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Games_GameId1",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Teams_SelectedTeamId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Teams_TeamId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Users_UserId",
                table: "Picks");

            migrationBuilder.DropForeignKey(
                name: "FK_Picks_Users_UserId1",
                table: "Picks");

            migrationBuilder.DropIndex(
                name: "IX_Picks_GameId1",
                table: "Picks");

            migrationBuilder.DropIndex(
                name: "IX_Picks_TeamId",
                table: "Picks");

            migrationBuilder.DropIndex(
                name: "IX_Picks_UserId1",
                table: "Picks");

            migrationBuilder.DropColumn(
                name: "GameId1",
                table: "Picks");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Picks");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Picks");

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "Abbreviation", "BannerUrl", "City", "Conference", "CreatedAt", "Division", "ExternalTeamId", "IconUrl", "Name", "PrimaryColor", "SecondaryColor", "TertiaryColor", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "BAL", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/bal.png", "Baltimore", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "33", "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png", "Ravens", "#241773", "#000000", "#9E7C0C", null },
                    { 2, "CIN", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/cin.png", "Cincinnati", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "4", "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png", "Bengals", "#FB4F14", "#000000", "#FFFFFF", null },
                    { 3, "CLE", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/cle.png", "Cleveland", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "5", "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png", "Browns", "#311D00", "#FF3C00", "#FFFFFF", null },
                    { 4, "PIT", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/pit.png", "Pittsburgh", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "23", "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png", "Steelers", "#FFB612", "#101820", "#A5ACAF", null },
                    { 5, "HOU", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/hou.png", "Houston", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "34", "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png", "Texans", "#03202F", "#A71930", "#FFFFFF", null },
                    { 6, "IND", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/ind.png", "Indianapolis", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "11", "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png", "Colts", "#002C5F", "#A2AAAD", "#FFFFFF", null },
                    { 7, "JAX", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/jax.png", "Jacksonville", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "30", "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png", "Jaguars", "#006778", "#9F792C", "#000000", null },
                    { 8, "TEN", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/ten.png", "Tennessee", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "10", "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png", "Titans", "#0C2340", "#4B92DB", "#C8102E", null },
                    { 9, "BUF", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/buf.png", "Buffalo", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "2", "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png", "Bills", "#00338D", "#C60C30", "#FFFFFF", null },
                    { 10, "MIA", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/mia.png", "Miami", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "15", "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png", "Dolphins", "#008E97", "#FC4C02", "#005778", null },
                    { 11, "NE", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/ne.png", "New England", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "17", "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png", "Patriots", "#002244", "#C60C30", "#B0B7BC", null },
                    { 12, "NYJ", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/nyj.png", "New York", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "20", "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png", "Jets", "#125740", "#000000", "#FFFFFF", null },
                    { 13, "DEN", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/den.png", "Denver", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "7", "https://a.espncdn.com/i/teamlogos/nfl/500/den.png", "Broncos", "#FB4F14", "#002244", "#FFFFFF", null },
                    { 14, "KC", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png", "Kansas City", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "12", "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png", "Chiefs", "#E31837", "#FFB81C", "#FFFFFF", null },
                    { 15, "LV", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/lv.png", "Las Vegas", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "13", "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png", "Raiders", "#000000", "#A5ACAF", "#FFFFFF", null },
                    { 16, "LAC", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/lac.png", "Los Angeles", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "24", "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png", "Chargers", "#0080C6", "#FFC20E", "#FFFFFF", null },
                    { 17, "CHI", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/chi.png", "Chicago", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "3", "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png", "Bears", "#0B162A", "#C83803", "#FFFFFF", null },
                    { 18, "DET", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/det.png", "Detroit", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "8", "https://a.espncdn.com/i/teamlogos/nfl/500/det.png", "Lions", "#0076B6", "#B0B7BC", "#000000", null },
                    { 19, "GB", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/gb.png", "Green Bay", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "9", "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png", "Packers", "#203731", "#FFB612", "#FFFFFF", null },
                    { 20, "MIN", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/min.png", "Minnesota", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "16", "https://a.espncdn.com/i/teamlogos/nfl/500/min.png", "Vikings", "#4F2683", "#FFC62F", "#FFFFFF", null },
                    { 21, "ATL", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/atl.png", "Atlanta", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "1", "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png", "Falcons", "#A71930", "#000000", "#A5ACAF", null },
                    { 22, "CAR", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/car.png", "Carolina", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "29", "https://a.espncdn.com/i/teamlogos/nfl/500/car.png", "Panthers", "#0085CA", "#101820", "#BFC0BF", null },
                    { 23, "NO", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/no.png", "New Orleans", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "18", "https://a.espncdn.com/i/teamlogos/nfl/500/no.png", "Saints", "#D3BC8D", "#101820", "#FFFFFF", null },
                    { 24, "TB", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/tb.png", "Tampa Bay", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "27", "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png", "Buccaneers", "#D50A0A", "#FF7900", "#B1BABF", null },
                    { 25, "DAL", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/dal.png", "Dallas", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "6", "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png", "Cowboys", "#003594", "#041E42", "#869397", null },
                    { 26, "NYG", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/nyg.png", "New York", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "19", "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png", "Giants", "#0B2265", "#A71930", "#A5ACAF", null },
                    { 27, "PHI", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/phi.png", "Philadelphia", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "21", "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png", "Eagles", "#004C54", "#A5ACAF", "#ACC0C6", null },
                    { 28, "WSH", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/wsh.png", "Washington", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "28", "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png", "Commanders", "#5A1414", "#FFB612", "#FFFFFF", null },
                    { 29, "ARI", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/ari.png", "Arizona", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "22", "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png", "Cardinals", "#97233F", "#000000", "#FFB612", null },
                    { 30, "LAR", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/lar.png", "Los Angeles", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "14", "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png", "Rams", "#003594", "#FFA300", "#FF8200", null },
                    { 31, "SF", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/sf.png", "San Francisco", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "25", "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png", "49ers", "#AA0000", "#B3995D", "#FFFFFF", null },
                    { 32, "SEA", "https://a.espncdn.com/i/teamlogos/nfl/500-dark/sea.png", "Seattle", 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "26", "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png", "Seahawks", "#002244", "#69BE28", "#A5ACB0", null }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Teams_WinningTeamId",
                table: "Games",
                column: "WinningTeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Games_GameId",
                table: "Picks",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Teams_SelectedTeamId",
                table: "Picks",
                column: "SelectedTeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Picks_Users_UserId",
                table: "Picks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
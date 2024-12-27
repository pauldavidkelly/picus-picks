﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Picus.Api.Data;

#nullable disable

namespace Picus.Api.Migrations
{
    [DbContext(typeof(PicusDbContext))]
    [Migration("20241227143326_RenameEspnGameId")]
    partial class RenameEspnGameId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Picus.Api.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AwayTeamId")
                        .HasColumnType("integer");

                    b.Property<int?>("AwayTeamScore")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ESPNGameId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("GameTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("HomeTeamId")
                        .HasColumnType("integer");

                    b.Property<int?>("HomeTeamScore")
                        .HasColumnType("integer");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPlayoffs")
                        .HasColumnType("boolean");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PickDeadline")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Season")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.Property<int?>("WinningTeamId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AwayTeamId");

                    b.HasIndex("HomeTeamId");

                    b.HasIndex("WinningTeamId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Picus.Api.Models.League", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AdminUserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AdminUserId");

                    b.ToTable("Leagues");
                });

            modelBuilder.Entity("Picus.Api.Models.Pick", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<int?>("GameId1")
                        .HasColumnType("integer");

                    b.Property<bool?>("IsCorrect")
                        .HasColumnType("boolean");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("SelectedTeamId")
                        .HasColumnType("integer");

                    b.Property<int?>("TeamId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId1")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("GameId1");

                    b.HasIndex("SelectedTeamId");

                    b.HasIndex("TeamId");

                    b.HasIndex("UserId");

                    b.HasIndex("UserId1");

                    b.ToTable("Picks");
                });

            modelBuilder.Entity("Picus.Api.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Abbreviation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("BannerUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Conference")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Division")
                        .HasColumnType("integer");

                    b.Property<string>("ExternalTeamId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("IconUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PrimaryColor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SecondaryColor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TertiaryColor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Picus.Api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Auth0Id")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int?>("LeagueId")
                        .HasColumnType("integer");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TimeZone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Auth0Id")
                        .IsUnique();

                    b.HasIndex("LeagueId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Picus.Api.Models.Game", b =>
                {
                    b.HasOne("Picus.Api.Models.Team", "AwayTeam")
                        .WithMany("AwayGames")
                        .HasForeignKey("AwayTeamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Picus.Api.Models.Team", "HomeTeam")
                        .WithMany("HomeGames")
                        .HasForeignKey("HomeTeamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Picus.Api.Models.Team", "WinningTeam")
                        .WithMany()
                        .HasForeignKey("WinningTeamId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("AwayTeam");

                    b.Navigation("HomeTeam");

                    b.Navigation("WinningTeam");
                });

            modelBuilder.Entity("Picus.Api.Models.League", b =>
                {
                    b.HasOne("Picus.Api.Models.User", "AdminUser")
                        .WithMany()
                        .HasForeignKey("AdminUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("AdminUser");
                });

            modelBuilder.Entity("Picus.Api.Models.Pick", b =>
                {
                    b.HasOne("Picus.Api.Models.Game", "Game")
                        .WithMany()
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Picus.Api.Models.Game", null)
                        .WithMany("Picks")
                        .HasForeignKey("GameId1");

                    b.HasOne("Picus.Api.Models.Team", "SelectedTeam")
                        .WithMany()
                        .HasForeignKey("SelectedTeamId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Picus.Api.Models.Team", null)
                        .WithMany("Picks")
                        .HasForeignKey("TeamId");

                    b.HasOne("Picus.Api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Picus.Api.Models.User", null)
                        .WithMany("Picks")
                        .HasForeignKey("UserId1");

                    b.Navigation("Game");

                    b.Navigation("SelectedTeam");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Picus.Api.Models.User", b =>
                {
                    b.HasOne("Picus.Api.Models.League", "League")
                        .WithMany("Members")
                        .HasForeignKey("LeagueId");

                    b.Navigation("League");
                });

            modelBuilder.Entity("Picus.Api.Models.Game", b =>
                {
                    b.Navigation("Picks");
                });

            modelBuilder.Entity("Picus.Api.Models.League", b =>
                {
                    b.Navigation("Members");
                });

            modelBuilder.Entity("Picus.Api.Models.Team", b =>
                {
                    b.Navigation("AwayGames");

                    b.Navigation("HomeGames");

                    b.Navigation("Picks");
                });

            modelBuilder.Entity("Picus.Api.Models.User", b =>
                {
                    b.Navigation("Picks");
                });
#pragma warning restore 612, 618
        }
    }
}

﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Resist.Models;

namespace Resist.Migrations
{
    [DbContext(typeof(ResistContext))]
    [Migration("20191229031653_alter-missions-mission-number")]
    partial class altermissionsmissionnumber
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Resist.Models.Game", b =>
                {
                    b.Property<int>("GameId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Status");

                    b.HasKey("GameId");

                    b.ToTable("Game");
                });

            modelBuilder.Entity("Resist.Models.GameUser", b =>
                {
                    b.Property<int>("GameUserId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GameId");

                    b.Property<int>("Role");

                    b.Property<int>("UserId");

                    b.HasKey("GameUserId");

                    b.HasAlternateKey("GameId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("GameUser");
                });

            modelBuilder.Entity("Resist.Models.GameUserMission", b =>
                {
                    b.Property<int>("GameUserMissionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GameUserId");

                    b.Property<int>("MissionId");

                    b.HasKey("GameUserMissionId");

                    b.HasAlternateKey("GameUserId", "MissionId");

                    b.HasIndex("MissionId");

                    b.ToTable("GameUserMission");
                });

            modelBuilder.Entity("Resist.Models.Mission", b =>
                {
                    b.Property<int>("MissionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GameId");

                    b.Property<int>("MissionNumber");

                    b.Property<int>("Status");

                    b.HasKey("MissionId");

                    b.HasIndex("GameId");

                    b.ToTable("Mission");
                });

            modelBuilder.Entity("Resist.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("UserId");

                    b.HasAlternateKey("Username")
                        .HasName("Unique_Usernam");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Resist.Models.GameUser", b =>
                {
                    b.HasOne("Resist.Models.Game", "Game")
                        .WithMany("GameUsers")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Resist.Models.User", "User")
                        .WithMany("GameUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Resist.Models.GameUserMission", b =>
                {
                    b.HasOne("Resist.Models.GameUser", "GameUser")
                        .WithMany("GameUserMissions")
                        .HasForeignKey("GameUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Resist.Models.Mission", "Mission")
                        .WithMany("GameUserMissions")
                        .HasForeignKey("MissionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Resist.Models.Mission", b =>
                {
                    b.HasOne("Resist.Models.Game", "Game")
                        .WithMany("Missions")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}

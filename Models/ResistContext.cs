using System;
using Microsoft.EntityFrameworkCore;

using Resist.Models;

namespace Resist.Models
{
    public class ResistContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameUser> GameUsers { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO: Move somewhere else based on environment
            string connectionString = "Host=localhost;Database=resist";
            optionsBuilder.UseNpgsql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Game>().ToTable("Game");
            modelBuilder.Entity<GameUser>().ToTable("GameUser");

            modelBuilder.Entity<User>().HasKey( i => i.UserId );
            modelBuilder.Entity<Game>().HasKey( i => i.GameId );
            modelBuilder.Entity<GameUser>().HasKey( i => i.GameUserId );

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasAlternateKey(u => u.Username)
                .HasName("Unique_Usernam");

            modelBuilder.Entity<User>()
                .HasMany(u => u.GameUsers);

            modelBuilder.Entity<GameUser>()
                .HasOne(u => u.User);

            modelBuilder.Entity<GameUser>()
                .HasOne(u => u.Game);
        }
    }
}
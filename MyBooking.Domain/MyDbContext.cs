using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using MyBooking.Domain.Entities;

namespace MyBooking.Domain
{
    public class MyDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "MyBookingDb.db" };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);

            optionsBuilder.UseSqlite(connection);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        public DbSet<Cred> Creds { get; set; }
    }
}

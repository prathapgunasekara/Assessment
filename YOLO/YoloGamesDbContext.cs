using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection;
using YOLO.Models;

namespace YOLO
{
    public class YoloGamesDbContext : DbContext
    {
        public YoloGamesDbContext(DbContextOptions<YoloGamesDbContext> options)
        : base(options) { }

        public DbSet<YoloGame> YoloGame { get; set; }
        public DbSet<Customer> Customers { get; set; }

    }


}



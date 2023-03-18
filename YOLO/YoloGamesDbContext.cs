using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection;

namespace YOLO
{
    public class YoloGamesDbContext : DbContext
    {
        public YoloGamesDbContext(DbContextOptions<YoloGamesDbContext> options)
        : base(options) { }

        public DbSet<YoloGame> YoloGame { get; set; }
    }

    public class YoloGame
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }  
        public DateTime CreationDate { get; set; }
    }
}



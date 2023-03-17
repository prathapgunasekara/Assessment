using Microsoft.EntityFrameworkCore;

namespace YOLO
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new YoloGamesDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<YoloGamesDbContext>>()))
            {
                // Look for any board games.
                if (context.YoloGame.Any())
                {
                    return;   // Data was already seeded
                }

                context.YoloGame.AddRange(
                    new YoloGame
                    {
                        Id = Guid.NewGuid(),
                        Name = "Candy Land",
                        Description = "Candy Land version 1",
                        Category = "Puzzle",
                        CreationDate = new DateTime(2015, 06, 04, 04 ,13,34)
                    },    

                    new YoloGame
                    {
                        Id = Guid.NewGuid(),
                        Name = "Sorry Land",
                        Description = "Hasbro version 1",
                        Category = "War",
                        CreationDate = new DateTime(2018, 01, 02)
                    },
                    new YoloGame
                    {
                        Id = Guid.NewGuid(),
                        Name = "Ticket to Ride",
                        Description = "Days of Wonder version 1",
                        Category = "Sport",
                        CreationDate = new DateTime(2020, 11, 02)
                    },
                    new YoloGame
                    {
                        Id = Guid.NewGuid(),
                        Name = "Buzan",
                        Description = "Days of Buzan version 1",
                        Category = "Horror",
                        CreationDate = new DateTime(2023, 12, 02)
                    }


                    ); ;

                context.SaveChanges();
            }
        }
    }
}

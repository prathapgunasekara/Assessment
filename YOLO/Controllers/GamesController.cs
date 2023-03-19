using Microsoft.AspNetCore.Mvc;
using YOLO.Models;

namespace YOLO.Controllers
{
        [ApiController]
    [Route("[controller]")]
    public class GamesController : Controller
    {

         private YoloGamesDbContext _context;

        public GamesController(YoloGamesDbContext context)
        {
            _context = context;
        }

         [HttpGet]
        public IActionResult Index()
        {
            var games = _context.YoloGame.ToList();
            return Ok(games);
        }

        //...

        [HttpPost]
        public IActionResult Add([FromBody] YoloGame game)
        {
            //Determine the next ID
            var newID = Guid.NewGuid();
            game.Id = newID;

            _context.YoloGame.Add(game);
            _context.SaveChanges();
        
            var games = _context.YoloGame.ToList();
            return Ok(games);
        }


        [HttpPut]
        public IActionResult Edit(YoloGame game )
        {
            _context.YoloGame.Update(game);
            _context.SaveChanges();
            var games = _context.YoloGame.ToList();
            return Ok(games);
         }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var game = _context.YoloGame.Find(id);

            _context.YoloGame.Remove(game);
            _context.SaveChanges();

            var games = _context.YoloGame.ToList();
            return Ok(games);
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace YOLO.Controllers
{
        [ApiController]
    [Route("[controller]")]
    public class GamesController : Controller
    {

        //We inject the DBContext into the controller...
        private YoloGamesDbContext _context;

        public GamesController(YoloGamesDbContext context)
        {
            _context = context;
        }

        //...and can access it in our actions.
        [HttpGet]
        public IActionResult Index()
        {
            var games = _context.YoloGame.ToList();
            return Ok(games);
        }

        //...

        [HttpPost]
        public IActionResult Add(YoloGame game)
        {
            //Determine the next ID
            var newID = Guid.NewGuid();
            game.Id = newID;

            _context.YoloGame.Add(game);
            _context.SaveChanges();
            return Ok(game);
        }

        //...

        [HttpPut]
        public IActionResult Edit(int id)
        {
            var game = _context.YoloGame.Find(id);
            return View(game);
        }

        //[HttpPost]
        //public IActionResult Edit(YoloGame game)
        //{
        //    _context.YoloGame.Update(game);
        //    _context.SaveChanges();

        //    return RedirectToAction("Index");
        //}
    }
}

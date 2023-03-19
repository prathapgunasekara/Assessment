using Microsoft.AspNetCore.Mvc;
using YOLO.Models;

namespace YOLO.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : Controller
    {
        private YoloGamesDbContext _context;

        public CustomersController(YoloGamesDbContext context)
        {
            _context = context;
        }

        //...and can access it in our actions.
        [HttpGet]
        public IActionResult Index()
        {
            var customers = _context.Customers.ToList();
            return Ok(customers);
        }

        //...

        [HttpPost]
        public IActionResult Add([FromBody] Customer customer)
        {
            //Determine the next ID
            var newID = Guid.NewGuid();
            customer.Id = newID;

            _context.Customers.Add(customer);
            _context.SaveChanges();

            var customers = _context.Customers.ToList();
            return Ok(customers);
        }


        [HttpPut]
        public IActionResult Edit(Customer customer)
        {
            _context.Customers.Update(customer);
            _context.SaveChanges();
            var customers = _context.Customers.ToList();
            return Ok(customers);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var customer = _context.Customers.Find(id);

            _context.Customers.Remove(customer);
            _context.SaveChanges();

            var customers = _context.Customers.ToList();
            return Ok(customers);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Task = TaskApi.Models.Task;
using TaskApi.Data;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Task>> GetTasks() => _context.GetTasks().ToList();

        [HttpGet("{id}")]
        public ActionResult<Task> GetTask(int id)
        {
            var task = _context.GetTask(id);
            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public IActionResult CreateTask(Task task)
        {
            _context.AddTask(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, Task updatedTask)
        {
            var task = _context.GetTask(id);
            if (task == null) return NotFound();

            _context.UpdateTask(updatedTask);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.GetTask(id);
            if (task == null) return NotFound();

            _context.DeleteTask(id);
            return NoContent();
        }
    }
}

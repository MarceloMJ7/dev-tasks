using System.Collections.Generic;
using System.Linq;
using Task = TaskApi.Models.Task;

namespace TaskApi.Data
{
    public class TaskContext
    {
        private static List<Task> _tasks = new List<Task>();

        public IEnumerable<Task> GetTasks() => _tasks;
        
        public Task? GetTask(int id) => _tasks.FirstOrDefault(t => t.Id == id);

        public void AddTask(Task task)
        {
            if (task != null)
            {
                _tasks.Add(task);
            }
        }

        public void UpdateTask(Task updatedTask)
        {
            if (updatedTask == null) return;

            var task = _tasks.FirstOrDefault(t => t.Id == updatedTask.Id);
            if (task != null)
            {
                task.Title = updatedTask.Title;
                task.Completed = updatedTask.Completed;
            }
        }

        public void DeleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task != null)
            {
                _tasks.Remove(task);
            }
        }
    }
}

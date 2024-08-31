namespace TaskApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        // Marcar como required
        public string Title { get; set; } = string.Empty; 

        public bool Completed { get; set; }
    }
}

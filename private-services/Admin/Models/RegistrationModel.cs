using MongoDB.Bson.Serialization.Attributes;

namespace Admin.Models
{
    public class RegistrationModel
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
       // public DateTime UpdatedOn { get; set; } = DateTime.Now
    }
}
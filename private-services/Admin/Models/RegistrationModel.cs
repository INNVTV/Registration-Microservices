using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Admin.Models
{
    public class RegistrationModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        [BsonElement("dateCreated")]
        public double DateCreated { get; set; } = 0; //= DateTime.Now;
    }
}
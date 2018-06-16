using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Admin.Models;
using MongoDB.Driver;

namespace Admin.Pages
{
    public class IndexModel : PageModel
    {
        public string newRecords;

        private IMongoDatabase _database = null;
        public void OnGet()
        {
            var mongoUri = AppSettings.MongoDbUri;
            var mongoDbName = AppSettings.MongoDbName;

            var client = new MongoClient(mongoUri);
            if(client != null)
            {
                _database = client.GetDatabase(mongoDbName);
                var newRecords =_database.GetCollection<RegistrationModel>("new");
            }
        }
    }
}

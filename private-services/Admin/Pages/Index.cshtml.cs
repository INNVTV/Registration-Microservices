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
        public List<RegistrationModel> regRecords;
        public string filter = "new";
        private IMongoDatabase _database = null;
        public void OnGet()
        {
            string queryString = HttpContext.Request.Query["filter"].ToString();
            if(queryString != String.Empty)
            {
                filter = queryString;
            }
            

            var mongoUri = AppSettings.MongoDbUri;
            var mongoDbName = AppSettings.MongoDbName;

            var client = new MongoClient(mongoUri);

            if(client != null)
            {
                _database = client.GetDatabase(mongoDbName);
                var regCollection =_database.GetCollection<RegistrationModel>(filter);
                regRecords = regCollection.Find(_ => true).ToList();
                //regRecords = regCollection.Find(r => r.Name == "Name").ToList();
                regRecords.Reverse();
            }
            else
            {
                regRecords = new List<RegistrationModel>();
            }

            
        }
    }
}

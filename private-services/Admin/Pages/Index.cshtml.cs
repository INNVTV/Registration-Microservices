using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Admin.Pages
{
    public class IndexModel : PageModel
    {
        public string applicationName;
        public string mongoUri;
        public void OnGet()
        {
            //applicationName = "1";
            //mongoUri = "2";

            applicationName = AppSettings.ApplicationName;
            mongoUri = AppSettings.MongoDbUri;
        }
    }
}

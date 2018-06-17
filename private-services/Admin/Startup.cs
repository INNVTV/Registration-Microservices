using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Admin
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional:true)
                .AddEnvironmentVariables(); //<-- Allows for Docker Env Variables
            Configuration = builder.Build();

            /* Injecting Environment Variables with Docker:
            ------------------------------------------------------------------

            Dockerfile:
                ?

            Docker Build:
                ?

            Docker Run:
                -e Settings:MongoDbUri=mongodb://dockerrun:27017/registrations

            docker-compose:                
                environment:
                 - Settings:ApplicationName=From Compose
                 - Settings:MongoDbUri=mongodb://mongodb:27017/registrations   

            ------------------------------------------------------------------*/

            AppSettings.ApplicationName = Configuration["Settings:ApplicationName"]; //<-- pulls from json settings
            AppSettings.MongoDbUri = Configuration["Settings:MongoDbUri"]; //<-- pulls from json settings
            AppSettings.MongoDbName = Configuration["Settings:MongoDbName"]; //<-- pulls from json settings
            
            // Get instance id:
            AppSettings.InstanceId = 0;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //Configure services to use the AppSettings model throught our application
            //services.Configure<AppSettings>(Configuration.GetSection("SectionName"));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.UseHttpsRedirection(); //<-- Can cause errors with local docker-compose development
            app.UseStaticFiles();
            app.UseCookiePolicy();
            

            app.UseMvc();
        }
    }
}

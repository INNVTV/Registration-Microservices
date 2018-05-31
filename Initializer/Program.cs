using System;
using System.Data.SqlClient;
using System.Text;
using System.Threading;

namespace initializer
{
    class Program
    {
        // AutoResetEvent to signal when to exit the application.
        //private static readonly AutoResetEvent waitHandle = new AutoResetEvent(false);
        static void Main(string[] args)
        {
            Console.WriteLine("Initializing Registarion Microservices");
            Console.WriteLine();

            Console.WriteLine("Connecting to SQL....");

            #region Sql Connection

                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "";

            #endregion

            Console.WriteLine("Checking resources....");

        }
    }
}

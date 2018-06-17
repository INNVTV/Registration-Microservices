using System;
using System.Threading;

namespace Worker
{
    class Program
    {
        static void Main(string[] args)
        {
            //Runs every 5 minutes to move "new" registrations into the "processed" or "rejected" collection

            while (true)
            {
                Thread.Sleep(12000);
                ProcessRegistrations();
            }       
        }

        public static void ProcessRegistrations()
        {
            Console.WriteLine("Worker: Processing...");
        }
    }
}

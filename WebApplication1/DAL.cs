using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    public class DAL
    {

        public void insertMessage(string name, string message, DateTime date)
        {
            
            using (Entities db = new Entities())
            {
                try
                {
                    ChatMessage m = new ChatMessage();
                    m.Message = message;
                    m.UserName = name;
                    m.date = date;
                    db.ChatMessages.Add(m);

                    db.SaveChanges();
                }
                catch (Exception e)
                { 
                    //string error = e.InnerException != null ? e.InnerException.Message : e.Message;
                    //TODO: loggin the error
                    throw e;
                }
            }
        }

    }
}
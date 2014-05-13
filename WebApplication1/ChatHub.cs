using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections;

namespace WebApplication1
{
    public class ChatHub : Hub
    {
        private static Hashtable onlineCliens = new Hashtable();

        public void Send(string name, string message)
        {
            // update all clients with the new message
            Clients.All.broadcastMessage(name + " " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") , message);
            
            ///TODO: Save message to DB.
            ///

        }

        public void ClientLogin(string userName)
        {
            //save the new user and 
            if (!onlineCliens.ContainsKey(userName))
            {
                //update all clients - users list
                Clients.All.addClientToChat(userName);
                //save new client for 
                onlineCliens.Add(userName, Context.ConnectionId);
            }
            //TODO:
           //add code in case the user name already exists
        }


        public void ClientLogout(string userName)
        {
            //save the new user and 
            if (onlineCliens.ContainsKey(userName))
            {
                //update all clients - users list
                Clients.All.removeClientfromChat(userName);
                //save new client for 
                onlineCliens.Remove(userName);
            }
            ///todo:
            ///add code in case the user name not found
            //
        }

        


    }
}
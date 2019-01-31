var Menu = 
{
    "mainLocation" : 0,
    "eventLocation" : 0,
    "clientLocation" : 0,

    "errorLog" : "",

    "isRunning" : true,

    "mainMenu" : function()
    {
        if(this.mainLocation == 0)
        {
            var selection = prompt(this.errorLog + "* Welcome to Our Event Organizer System *"
            + "\nPlease Select an Action:"
            + "\n"
            + "\n1. Event System"
            + "\n2. Client System\n");
            
            console.log("Selection: " + selection);

            if(selection == null)
            {
                this.retrurnToMainMenu();
                this.isRunning = false;
                return;
            }

            if(selection <= 0 || selection > 2)
            {
                this.errorLog = "Please Enter a Valid Path Number!\n";
                return;
            }
            
            this.errorLog = "";

            this.mainLocation = selection;
        }

        if(this.mainLocation == 1)
        {
            this.eventMenu();
        }
        else if(this.mainLocation == 2)
        {
            this.clientMenu();
        }
    },

    "eventMenu" : function()
    {
        if(this.eventLocation == 0)
        {
            var selection = prompt(this.errorLog + "Please Select an Event Action:"
            + "\n"
            + "\n1. Create an Event"
            + "\n2. View an Event" 
            + "\n3. Update an Event" 
            + "\n4. Delete an Event" 
            + "\n5. Add a Client to an Event" 
            + "\n6. View all Clients Attending an Event" 
            + "\n7. Delete Attending Client to an Event" 
            + "\n8. Find Most Attending Event" 
            + "\n9. Select All Events Suitable For Minors\n");
            
            console.log("Selection: " + selection);

            if(selection == null)
            {
                this.retrurnToMainMenu();
                return;
            }    

            if(selection <= 0 || selection > 9)
            {
                this.errorLog = "Please Enter a Valid Path Number!\n";
                return;
            }

            this.errorLog = "";

            this.eventLocation = selection;
        }

        if(this.eventLocation == 1)
        {
            EventUtil.createEvent();
            return;
        }
        else if(this.eventLocation == 2)
        {
            EventUtil.readEvent();
            return;
        }
        else if(this.eventLocation == 3)
        {
            EventUtil.updateEvent();
            return;
        }
        else if(this.eventLocation == 4)
        {
            EventUtil.deleteEvent();
            return;
        }
        else if(this.eventLocation == 5)
        {
            EventUtil.addClientToEvent();
            return;
        }
        else if(this.eventLocation == 6)
        {
            EventUtil.viewAllAttendingClients();
            return;
        }
        else if(this.eventLocation == 7)
        {
            EventUtil.deleteAttendingClient();
            return;
        }
        else if(this.eventLocation == 8)
        {
            EventUtil.getMostAttendingClients();
            return;
        }
        else if(this.eventLocation == 9)
        {
            EventUtil.getAllEventsForMinors();
            return;
        }
    },

    "clientMenu" : function()
    {
        if(this.clientLocation == 0)
        {
            var selection = prompt(this.errorLog + "Please Select an Event Action:"
            + "\n"
            + "\n1. Create a Client"
            + "\n2. View a Client" 
            + "\n3. Update a Client" 
            + "\n4. Delete a Client\n");
            
            console.log("Selection: " + selection);

            if(selection == null)
            {
                this.retrurnToMainMenu();
                return;
            }    

            if(selection <= 0 || selection > 7)
            {
                this.errorLog = "Please Enter a Valid Path Number!\n";
                return;
            }

            this.errorLog = "";

            this.clientLocation = selection;
        }

        if(this.clientLocation == 1)
        {
            ClientUtil.createClient();
            return;
        }
        else if(this.clientLocation == 2)
        {
            ClientUtil.readClient();
            return;
        }
        else if(this.clientLocation == 3)
        {
            ClientUtil.updateClient();
            return;
        }
        else if(this.clientLocation == 4)
        {
            ClientUtil.deleteClient();
            return;
        }
        // else if(this.clientLocation == 5)
        // {
        //     EventUtil.addClientToEvent();
        //     return;
        // }
        // else if(this.clientLocation == 6)
        // {
        //     EventUtil.viewAllAttendingClients();
        //     return;
        // }
        // else if(this.clientLocation == 7)
        // {
        //     EventUtil.deleteAttendingClient();
        //     return;
        // }
    },

    "retrurnToMainMenu" : function()
    {
        this.mainLocation = 0;
    },

    "retrurnToEventMenu" : function()
    {
        this.eventLocation = 0;
    },

    "retrurnToClientMenu" : function()
    {
        this.clientLocation = 0;
    }
}
var eventIDCounter = 1;
var clientIDCounter = 1;
var eventsDatabase = [];
var clientsDatabase = [];

//Flag: True - Underage Restricted Event  
function EventBase(name, flag = false)
{
    this.id = IDCounter.getNextEventID();
    this.eventName = name;
    this.ageFlag = flag;
    this.attendingClients = [];

    eventsDatabase.push(this);
    
    return this;
}

function DisplayEventShort(event)
{
    var message = "Event Name: " + event.eventName + "\nAge Restriction: " + event.ageFlag;
    alert(message);
}

function DisplayEventFull(event)
{
    var message = "ID: " + event.id
    + "\nEvent Name: " + event.eventName 
    + "\n-----------------------------------"
    + "\nAge Restriction: " + event.ageFlag
    + "\n-----------------------------------"
    + "\nClietn List:";

    eventClientList = event.attendingClients;

    for (var i = 0; i < eventClientList.length; i++) 
    {
        message += "\n - " + eventClientList[i].firstName + " " + eventClientList[i].lastName;
    }

    alert(message);
}

function Client(first, last, gender, age)
{
    this.id = IDCounter.getNextClientID();
    this.firstName = first;
    this.lastName = last;
    this.gender = gender;
    this.age = age;

    clientsDatabase.push(this);

    return this;
}

function DisplayClientInList(client)
{
    var gender = (client.gender) ? "Male" : "Female";

    var message = client.firstName + " " + client.lastName 
    + ": " + gender + " - " + client.age;

    console.log(message);
    return message;
}

function DisplayClientFull(client)
{
    var message = "Client Name: " + client.firstName + " " + client.lastName 
    + "\nGender: " + client.gender + "\nAge: " + client.age;
    console.log(message);
}

function PopulateDefaultEvents()
{
    new EventBase("Gallery Opening");
    new EventBase("Horror Cinema Night", true);
    new EventBase("Friday Parti in Da Club", true);
    new EventBase("Theater Night");
    new EventBase("Traveling at Midnight", true);
}

function PopulateDefaultClients()
{
    new Client("Tom", "Hardy", true, 38);
    new Client("Elon", "Dusk", true, 35);
    new Client("Lara", "Raider", false, 25);
    new Client("Merry", "Larson", false, 18);
    new Client("Betty", "Lue", false, 8);
}

function PopulateDefaultAttendingClients()
{
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 4; j++)
            eventsDatabase[i].attendingClients.push(clientsDatabase[j]);
    }
}

function InitDatabase()
{
    PopulateDefaultEvents();
    PopulateDefaultClients();
    PopulateDefaultAttendingClients();
}

//Counters for Events And Clients IDs
var IDCounter =
{
    "eventIDCounter" : 1,
    "clientIDCounter" : 1,

    "getNextEventID" : function()
    {
        return this.eventIDCounter++;
    },

    "getNextClientID" : function()
    {
        return this.clientIDCounter++;
    },
}

//Event Functions
var EventUtil =
{
    "createEvent" : function()
    {
        var wait = true;

        var name = prompt("Please Enter Event Name");

        if(name == null)
        {
            Menu.retrurnToEventMenu();
            return;
        }

        while(wait)
        {
            if(name.length != 0)
            {
                wait = false;
            }
            else
            {
                alert("Invalid name");
                
                name = prompt("Please Enter a Valid Event Name");
            }
        }

        var flag = confirm("Is the Event Age Restricted ?", false);

        EventBase(name, flag);
        DisplayEventShort(eventsDatabase[eventsDatabase.length - 1]);

        alert("The Event " + name + " was successfully created");

        Menu.retrurnToEventMenu();
        return;
    },

    "readEvent" : function()
    {
        //Display the Available Options
        var options = "Select to View an Event:\n\n";
        options += this.displayAllEventsByUniqueID();

        //Get the Event ID in the Database
        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        var event = eventsDatabase[eventId];
         
        DisplayEventFull(event);
    },

    "updateEvent" : function()
    {
        //Display the Available Events
        var options = "Select an Event to Update:\n\n";
        options += this.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;
        
        //Get the Event that will be updated
        var event = eventsDatabase[eventId];
        var wait = true;
        var name = prompt("Change Event Name");

        if(name != null)
            while(wait)
            {
                if(name.length != 0)
                {
                    wait = false;
                }
                else
                {
                    alert("Invalid name");
                    
                    name = prompt("Please Enter a Valid Event Name");
                }
            }
        else
            return;

        var flag = confirm("Is the Event Age Restricted ?", false);
        
        event.eventName = name;
        event.ageFlag = flag;

        DisplayEventShort(event);

        alert("The Event " + name + " has been updated!");
    },

    "deleteEvent" : function()
    {
        //Display the Available Options
        var options = "Select an Event to Delete:\n\n";
        options += this.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;
        
        //Delete the Selected Event by Database ID
        alert("The Event " + eventsDatabase[eventId].eventName + " has been deleted!");
        eventsDatabase.splice(eventId, 1);
    },

    "addClientToEvent" : function()
    {
        //Display the Available Options
        var options = "Select an Event to Add a Client to it:\n\n";
        options += this.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        //Get the Event that will be used
        var event = eventsDatabase[eventId];

        //Display the All Clients
        options = "Select a Cliend to Add to the " + event.eventName + " Event:\n\n"
        options += this.displayAllClientsByUniqueID();

        //Get the Client Real ID
        var clientRealId = prompt(options);
        var isClientAttending = false;

        if(event.attendingClients != 0)
        {
            //Verify of the Client is not already Set in the attendingClients List of the Event
            isClientAttending = this.verifyResultDoesNotExistByUniqueID(clientRealId, event.attendingClients, "Client");
        }

        //If the Client is in the attendingClients We will return a positive value
        if(isClientAttending == true)
        {
            alert("The Client is Already Attending to this Event");
            return;
        }

        //Get the Client ID in the Database
        var clientListId = this.verifyResultExistByUniqueID(clientRealId, clientsDatabase, "Client");

        if(clientListId == -1)
            return;
        
        //Get Client
        var client = clientsDatabase[clientListId];

        if(client.age < 18 && event.ageFlag)
        {
            alert("You have to be over 18 years old to attend to this Event! \nYou are: " 
            + client.age + " years old");

            return;
        }

        event.attendingClients.push(client);

        alert("You have successfully been assigned to the Event " + event.eventName);
    },

    "viewAllAttendingClients" : function(event, filter)
    {
        //Display the Available Filter Options
        var options = "Select to View an Event:\n\n";
        options += this.displayAllEventsByUniqueID();

        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        //Set filter Value: //0 All / 1 Male / 2 Female
        var filter = prompt(this.displayClientsFilter())
        filter = this.verifyResultByListID(filter, 3, "Filter");

        if(filter == -1)
            return;

        //Get Event And Attending List
        var event = eventsDatabase[eventId];
        var attendingClients = event.attendingClients;

        if(attendingClients.length == 0) 
        {
            alert("The List with Clients for the Event " + event.eventName + " is Empty");
            return;
        }

        var clientList = "The Cliend are: "
        + "\n-----------------------------------";
        
        if(filter == 0)
        {
            for(var i = 0; i < attendingClients.length; i++)
            {
                clientList += "\n" + DisplayClientInList(attendingClients[i]);
            }
        }
        else
        {
            var filterGender = (filter == 1) ? true : false;

            for(var i = 0; i < attendingClients.length; i++)
            {
                if(attendingClients[i].gender == filterGender)
                {
                    clientList += "\n" + DisplayClientInList(attendingClients[i]);
                }
            }
        }

        alert(clientList);
    },

    "deleteAttendingClient" : function()
    {
        //Display the Available Events
        var options = "Select to View an Event:\n\n";
        options += this.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = this.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        //Get Event And Attending List
        var event = eventsDatabase[eventId];
        var clientsAttendingList = event.attendingClients;

        if(clientsAttendingList.length == 0) 
        {
            alert("The List with Clients for the Event " + event.eventName + " is Empty");
            return;
        }

        options = "Select a Cliend to Add to the " + event.eventName + " Event:\n\n"
        options += this.displayAllClientsByUniqueID(clientsAttendingList);

        var clientRealId = prompt(options);
        var clientListId = this.verifyResultExistByUniqueID(clientRealId, clientsDatabase, "Client");

        if(clientListId == -1)
            return;

        for(var i = 0; i < clientsAttendingList.length; i++)
        {
            if(clientsAttendingList[i].id == clientRealId)
            {
                alert("The Client " + event.attendingClients[i].firstName + " " + event.attendingClients[i].lastName 
                + " has been deleted from the Event!");

                event.attendingClients.splice(i, 1);
            }
        }
    },

    //Helper Function

    "displayAllEventsByListID" : function()
    {
        var options = "";

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            options += i + " - " + eventsDatabase[i].eventName + "\n";
        }

        return options;
    },

    "displayAllEventsByUniqueID" : function()
    {
        var options = "";

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            options += eventsDatabase[i].id + " - " + eventsDatabase[i].eventName + "\n";
        }

        return options;
    },

    "displayAllClientsByListID" : function(clientsList = clientsDatabase)
    {
        var options = "";

        for(var i = 0; i < clientsList.length; i++)
        {
            options += i + " - " + clientsList[i].firstName + " " + clientsList[i].lastName 
            + " - " + clientsList[i].age + "\n";
        }

        return options;
    },

    "displayAllClientsByUniqueID" : function(clientsList = clientsDatabase)
    {
        var options = "";

        for(var i = 0; i < clientsList.length; i++)
        {
            options += clientsList[i].id + " - " + clientsList[i].firstName + " " + clientsList[i].lastName 
            + " - " + clientsList[i].age + "\n";
        }

        return options;
    },

    "verifyResultByListID" : function(index, max, message)
    {
        if(index == null)
        {
            Menu.retrurnToEventMenu();
            return -1;
        }

        if(index < 0 || index >= max)
        {
            alert("There is no " + message + " with the ID: " + index);
            return -1;
        }

        return index;
    },

    "verifyResultExistByUniqueID" : function(index, list, message)
    {
        //If Cancel Was Selected we Return To the Previous Menu
        if(index == null)
        {
            Menu.retrurnToEventMenu();
            return -1;
        }

        //If the given Index is the same as a Index in the Database
        //We Return the index in the List
        //Not the Real Index Of The Element
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].id == index)
            {
                return i;
            }
        }

        alert("There is no " + message + " with the ID: " + index);
        return -1;
    },

    "verifyResultDoesNotExistByUniqueID" : function(index, list, message)
    {
        //If Cancel Was Selected we Return To the Previous Menu
        if(index == null)
        {
            Menu.retrurnToEventMenu();
            return false;
        }

        //If the given Index is the same as a Index in the Database
        //We Return the index in the List
        //Not the Real Index Of The Element
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].id == index)
            {
                alert("There is a " + message + " with the ID: " + index);
                return true;
            }
        }

        return false;
    },

    "displayClientsFilter" : function()
    {
        var options = "Please Select a Filter Type:";
        options += "\n0. All Clients"
        + "\n1. Only Male Clients" 
        + "\n2. Only Female Clients";

        return options;
    },
}

var Menu = 
{
    "mainLocation" : 0,
    "eventLocation" : 0,

    "errorLog" : "",

    "isRunning" : true,

    "mainMenu" : function()
    {
        if(this.mainLocation == 0)
        {
            var selection = prompt(this.errorLog + "Welcome to Our Event Organizer System"
            + "\nPlease Select an Action:"
            + "\n"
            + "\n1. Event System");
            
            console.log("Selection: " + selection);

            if(selection == null)
            {
                this.retrurnToMainMenu();
                this.isRunning = false;
                return;
            }

            if(selection <= 0 || selection > 1)
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
            + "\n7. Delete Attending Client to an Event");
            
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
    },

    "retrurnToMainMenu" : function()
    {
        this.mainLocation = 0;
    },

    "retrurnToEventMenu" : function()
    {
        this.eventLocation = 0;
    }
}

//Main Script

//Initialize Database
InitDatabase();

var isRunning = true;

while(Menu.isRunning)
{
    Menu.mainMenu();
}
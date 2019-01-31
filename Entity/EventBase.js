var eventsDatabase = [];

var EventIDCounter =
{
    "eventIDCounter" : 1,

    "getNextEventID" : function()
    {
        return this.eventIDCounter++;
    }
}

function Event(name, flag = false, date = DataManager.getCurrentDate())
{
    this.id = EventIDCounter.getNextEventID();
    this.eventName = name;
    this.ageFlag = flag;
    this.attendingClients = [];
    this.eventDate = date;

    eventsDatabase.push(this);
    
    return this;
}

function DisplayEventShort(event)
{
    var message = "Event Name: " + event.eventName + "\nAge Restriction: " + event.ageFlag
    + "\n Event Date: " + DataManager.displayDateAsMessage(event.eventDate);
    alert(message);
}

function DisplayEventFull(event)
{
    var message = "ID: " + event.id
    + "\nEvent Name: " + event.eventName 
    + "\nEvent Date: " + DataManager.displayDateAsMessage(event.eventDate);
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

//Event Functions
var EventUtil =
{
    "createEvent" : function()
    {
        var wait = true;

        var name = "";
        var flag = null;
        var dateType;
        var date;

        while(wait)
        {
            if(name.length == 0)
                name = prompt("Please Enter Event Name");

            if(name == null)
            {
                Menu.retrurnToEventMenu();
                return;
            }

            if(name.length == 0)
            {
                alert("Invalid name\nPlease Enter a Valid Event Name");
                name = "";
                continue;
            }

            if(flag == null)
                flag = confirm("Is the Event Age Restricted ?", false);

            dateType = confirm("Do You want to set the date yourself or to assign Today's Date?\n" +
            "\nOk - Choose Date\nCancel - Set Today's Date");

            if(dateType)
                date = DataManager.setDate();
            else
                date = DataManager.getCurrentDate();

            if(date == null)
                continue;
                
            wait = false;
        }

        EventBase(name, flag, date);
        DisplayEventShort(eventsDatabase[eventsDatabase.length - 1]);

        alert("The Event " + name + " was successfully created");

        Menu.retrurnToEventMenu();
        return;
    },

    "readEvent" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display Filter Options: //0 No Filter / 1 By Age Restriction
        var filter = prompt(DisplayAndValidation.displayEventsFilter())
        filter = DisplayAndValidation.verifyResultByListID(filter, 3, "Filter");

        if(filter == -1)
            return;
        
        var options = "Select to View an Event";

        if(filter == 0)
        {
            //Display the Available Options
            options += ":\n\n";
            options += DisplayAndValidation.displayAllEventsByUniqueID();
        }
        else if(filter == 1)
        {
            //Display the Available Options
            options = " By Age Restriction:\n\n";
            options += DisplayAndValidation.displeyAllEventsByAgeRestriction();
        }
        else if(filter == 2)
        {
            options = " --- Advance Filter --- \n";
            options += DisplayAndValidation.displayAdvancedFilter();

            var advancedFilter = prompt(options);
            advancedFilter = DisplayAndValidation.verifyResultByListID(advancedFilter, 2, "Filter");

            if(advancedFilter == -1)
                return;

            var filterResult = this.getAdvancedFilterResult(advancedFilter);
            //var filterResult = [];

            if(filterResult == null)
                return;

            if(filterResult.length == 0)
            {
                alert("No Result Found!");
                Menu.retrurnToEventMenu();
                return;
            }

            options = "Found Results:\n\n";
            options += DisplayAndValidation.displayAllEventsByFilterResult(filterResult);
        }
        
        //Get the Event ID in the Database
        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        var event = eventsDatabase[eventId];
         
        DisplayEventFull(event);
    },

    "updateEvent" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display the Available Events
        var options = "Select an Event to Update:\n\n";
        options += DisplayAndValidation.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

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
                    
                    name = prompt("Please Enter a Valid Event Name", event.eventName);
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
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display the Available Options
        var options = "Select an Event to Delete:\n\n";
        options += DisplayAndValidation.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;
        
        //Delete the Selected Event by Database ID
        alert("The Event " + eventsDatabase[eventId].eventName + " has been deleted!");
        eventsDatabase.splice(eventId, 1);
    },

    "addClientToEvent" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display the Available Options
        var options = "Select an Event to Add a Client to it:\n\n";
        options += DisplayAndValidation.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        //Get the Event that will be used
        var event = eventsDatabase[eventId];

        //Display the All Clients
        options = "Select a Cliend to Add to the " + event.eventName + " Event:\n\n"
        options += DisplayAndValidation.displayAllClientsByUniqueID();

        //Get the Client Real ID
        var clientRealId = prompt(options);
        var isClientAttending = false;

        if(event.attendingClients != 0)
        {
            //Verify of the Client is not already Set in the attendingClients List of the Event
            isClientAttending = DisplayAndValidation.verifyResultDoesNotExistByUniqueID(clientRealId, event.attendingClients, "Client");
        }

        //If the Client is in the attendingClients We will return a positive value
        if(isClientAttending == true)
        {
            alert("The Client is Already Attending to this Event");
            return;
        }

        //Get the Client ID in the Database
        var clientListId = DisplayAndValidation.verifyResultExistByUniqueID(clientRealId, clientsDatabase, "Client");

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
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display the Available Filter Options
        var options = "Select to View an Event:\n\n";
        options += DisplayAndValidation.displayAllEventsByUniqueID();

        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

        if(eventId == -1)
            return;

        //Set filter Value: //0 All / 1 Male / 2 Female
        var filter = prompt(DisplayAndValidation.displayClientsFilter())
        filter = DisplayAndValidation.verifyResultByListID(filter, 3, "Filter");

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
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        //Display the Available Events
        var options = "Select to View an Event:\n\n";
        options += DisplayAndValidation.displayAllEventsByUniqueID();

        //Get The Event ID in the Database
        var eventId = prompt(options);
        eventId = DisplayAndValidation.verifyResultExistByUniqueID(eventId, eventsDatabase, "Event");

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
        options += DisplayAndValidation.displayAllClientsByUniqueID(clientsAttendingList);

        var clientRealId = prompt(options);
        var clientListId = DisplayAndValidation.verifyResultExistByUniqueID(clientRealId, clientsDatabase, "Client");

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

    "getMostAttendingClients" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(eventsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        var maxClientCount = 0;
        var eventDatabaseIndices = [];

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            if(eventsDatabase[i].attendingClients.length > maxClientCount)
            {
                maxClientCount = eventsDatabase[i].attendingClients.length;
                eventDatabaseIndices = [];
                eventDatabaseIndices.push(i);
            }
            else if(eventsDatabase[i].attendingClients.length == maxClientCount)
            {
                eventDatabaseIndices.push(i);
            }
        }

        var message = "";

        if(eventDatabaseIndices.length > 1)
        {
            message = "The Events:";

            for(var i = 0; i < eventDatabaseIndices.length; i++)
            {
                message += "\n - " + eventsDatabase[eventDatabaseIndices[i]].eventName;
            }

            message += "\nHave " + maxClientCount + " Attending Clients Each.";
        }
        else
        {
            message = "The Event " + eventsDatabase[eventDatabaseIndices[0]].eventName 
            + " has " + maxClientCount + " Attending Clients.";
        }

        alert(message);
        Menu.retrurnToEventMenu();
    },

    "getAllEventsForMinors" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(clientsDatabase))
        {
            Menu.retrurnToEventMenu();
            return;
        }

        var message = "Events Suitable for Minors:"

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            if(eventsDatabase[i].ageFlag == false)
                message += "\n - " + eventsDatabase[i].eventName;
        }

        alert(message);
        Menu.retrurnToEventMenu();
    },

    "getAdvancedFilterResult" : function(filterType)
    {
        var options = "";
        var result = [];

        //Filter By Flag
        if(filterType == 0)
        {
            //Display the Available Options
            options = DisplayAndValidation.displayAgeFlagFilter();
            
            //True - Adults / False - Minors
            ageFilter = confirm(options);

            for(var i = 0; i < eventsDatabase.length; i++)
            {
                if(eventsDatabase[i].ageFlag == ageFilter)
                {
                    result.push(eventsDatabase[i]);
                }
            }
        }
        else//Filter By Name
        {
            options = "Please Enter the Word you want to Filter with:\n"

            searchWord = prompt(options);

            if(searchWord == null)
                return null;

            for(var i = 0; i < eventsDatabase.length; i++)
            {
                var eventName = eventsDatabase[i].eventName;

                var element = eventName.search(searchWord);

                if(element != -1)
                    result.push(eventsDatabase[i]);
            }
        }

        return result;
    }
}
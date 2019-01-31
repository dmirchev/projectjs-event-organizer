var DisplayAndValidation = 
{
    "checkIfDatabaseIsEmplty" : function(database)
    {
        if(database.length == 0)
        {
            alert("The Databe is Empty");
            return true;
        }

        return false;
    },

    "displayAllEventsByListID" : function()
    {
        var options = "";

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            options += i + " - " + this.displeyNameWithFeeIndex(eventsDatabase[i].eventFee) 
            + eventsDatabase[i].eventName + "\n";
        }

        return options;
    },

    "displayAllEventsByUniqueID" : function()
    {
        var options = "";

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            options += eventsDatabase[i].id + " - " + this.displeyNameWithFeeIndex(eventsDatabase[i].eventFee) 
            + eventsDatabase[i].eventName + "\n";
        }

        return options;
    },

    "displayAllEventsByFilterResult" : function(resultList)
    {
        var options = "";

        for(var i = 0; i < resultList.length; i++)
        {
            options += resultList[i].id + " - " + this.displeyNameWithFeeIndex(resultList[i].eventFee) 
            + resultList[i].eventName + "\n";
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

    "displeyAllEventsByAgeRestriction" : function()
    {
        var options = "";
        var forAdults = "Events For Adults:\n-----------------------------------\n";
        var forMinors = "\nEvents For Minors:\n-----------------------------------\n";

        for(var i = 0; i < eventsDatabase.length; i++)
        {
            if(eventsDatabase[i].ageFlag)
                forAdults += eventsDatabase[i].id + " - *" + eventsDatabase[i].eventName + "\n";
            else
                forMinors += eventsDatabase[i].id + " - #" + eventsDatabase[i].eventName + "\n";
        }

        options = forAdults + forMinors;
        return options;
    },

    "verifyResultByListID" : function(index, max, message)
    {
        if(index == null)
        {
            if(Menu.clientLocation != 0)
                Menu.retrurnToClientMenu();
            
            if(Menu.eventLocation != 0)
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
            if(Menu.clientLocation != 0)
                Menu.retrurnToClientMenu();
            
            if(Menu.eventLocation != 0)
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
            if(Menu.clientLocation != 0)
                Menu.retrurnToClientMenu();
            
            if(Menu.eventLocation != 0)
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

    "displayEventsFilter" : function()
    {
        var options = "Please Select a Filter Type:\n";
        options += "\n0. No Filter"
        + "\n1. Separate by Age Restriction" 
        + "\n2. Advanced Filter\n";

        return options;
    },

    "displayAdvancedFilter" : function()
    {
        var options = "Please Select a Filter Type:\n";
        options += "\n0. Filter By Age Flag"
        + "\n1. Filter By Name\n";

        return options;
    },

    "displayClientsFilter" : function()
    {
        var options = "Please Select a Filter Type:";
        options += "\n0. All Clients"
        + "\n1. Only Male Clients" 
        + "\n2. Only Female Clients";

        return options;
    },

    "displayAgeFlagFilter" : function()
    {
        var options = "Please Select Age Flag Filter Type:\n";
        options += "\nOK - Only For Adults"
        + "\nCancel - Only for Minors\n";

        return options;
    },

    "displeyEntyFee" : function(fee)
    {
        if(fee == 0)
            return "Free";

        return fee + "$";
    },

    "displeyNameWithFeeIndex" : function(fee)
    {
        console.log(fee);
        if(fee == 0)
            return "!";

        return "$";
    }
}
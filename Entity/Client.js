var clientsDatabase = [];

//Counters for Events And Clients IDs
var ClientIDCounter =
{
    "clientIDCounter" : 1,

    "getNextClientID" : function()
    {
        return this.clientIDCounter++;
    },
}

function Client(first, last, gender, age)
{
    this.id = ClientIDCounter.getNextClientID();
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

function DisplayClientShort(client)
{
    var gender = (client.gender) ? "Male" : "Female";

    var message = "Client Name: " + client.firstName + " " + client.lastName 
    + "\nAge: " + client.age + " - " + gender;
    alert(message);
}

function DisplayClientFull(client)
{
    var gender = (client.gender) ? "Male" : "Female";

    var message = "ID: " + client.id 
    + "\nClient Name: " + client.firstName + " " + client.lastName 
    + "\nGender: " + gender + "\nAge: " + client.age;

    alert(message);
}

var ClientUtil =
{
    "createClient" : function()
    {
        var waitName = true;
        var firstName, lastName = "";

        while(waitName)
        {
            firstName = prompt("Please Enter Client First Name");

            if(firstName == null)
            {
                Menu.retrurnToClientMenu();
                return;
            }

            lastName = prompt("Please Enter Client Last Name");
            
            if(lastName == null)
            {
                Menu.retrurnToClientMenu();
                return;
            }
            
        
            if(firstName.length != 0 && lastName.length != 0)
            {
                waitName = false;
            }
            else
            {
                alert("Invalid name");
            }
        }

        var gender = confirm("Are you Male or Female?\nOK - Male\nCanel - Female", true);

        var age = prompt("Please Enter Your Are.");
        var waitAge = true;

        if(age == null)
        {
            Menu.retrurnToClientMenu();
            return;
        }

        while(waitAge)
        {
            if(age > 0)
            {
                waitAge = false;
            }
            else
            {
                alert("Invalid Age");
                
                age = prompt("Please Enter a Valid Age");
            }
        }

        Client(firstName, lastName, gender, age);
        DisplayClientShort(clientsDatabase[clientsDatabase.length - 1]);

        alert("The Client " + firstName + " " + lastName + " was successfully created");

        Menu.retrurnToClientMenu();
        return;
    },

    "readClient" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(clientsDatabase))
        {
            Menu.retrurnToClientMenu();
            return;
        }

        //Display the Available Clients
        var options = "Select to View a Client:\n\n";
        options += DisplayAndValidation.displayAllClientsByUniqueID();

        //Get the Event ID in the Database
        var clientId = prompt(options);
        clientId = DisplayAndValidation.verifyResultExistByUniqueID(clientId, clientsDatabase, "Client");

        if(clientId == -1)
            return;

        console.log(clientId);

        var client = clientsDatabase[clientId];
         
        DisplayClientFull(client);
    },

    "updateClient" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(clientsDatabase))
        {
            Menu.retrurnToClientMenu();
            return;
        }

        //Display the Available Client
        var options = "Select an Client to Update:\n\n";
        options += DisplayAndValidation.displayAllClientsByUniqueID();

        //Get The Client ID in the Database
        var clientId = prompt(options);
        clientId = DisplayAndValidation.verifyResultExistByUniqueID(clientId, clientsDatabase, "Client");

        if(clientId == -1)
            return;
        
        //Get the Client that will be updated
        var client = clientsDatabase[clientId];
        
        var waitName = true;
        var firstName, lastName = "";

        while(waitName)
        {
            firstName = prompt("Please Enter Client First Name", client.firstName);

            if(firstName == null)
            {
                Menu.retrurnToClientMenu();
                return;
            }

            lastName = prompt("Please Enter Client Last Name", client.lastName);
            
            if(lastName == null)
            {
                Menu.retrurnToClientMenu();
                return;
            }
            
        
            if(firstName.length != 0 && lastName.length != 0)
            {
                waitName = false;
            }
            else
            {
                alert("Invalid name");
            }
        }

        var gender = confirm("Are you Male or Female?\nOK - Male\nCanel - Female", true);

        var age = prompt("Please Enter Your Are.", client.age);
        var waitAge = true;

        if(age == null)
        {
            Menu.retrurnToClientMenu();
            return;
        }

        while(waitAge)
        {
            if(age > 0)
            {
                waitAge = false;
            }
            else
            {
                alert("Invalid Age");
                
                age = prompt("Please Enter a Valid Age");
            }
        }

        client.firstName = firstName;
        client.lastName = lastName;
        client.gender = gender;
        client.age = age;

        DisplayClientShort(client);

        alert("The Client Info of " + firstName + " " + lastName + " has been updated!");
    },

    "deleteClient" : function()
    {
        if(DisplayAndValidation.checkIfDatabaseIsEmplty(clientsDatabase))
        {
            Menu.retrurnToClientMenu();
            return;
        }
        
        //Display the Available Clients
        var options = "Select a Client to Delete:\n\n";
        options += DisplayAndValidation.displayAllClientsByUniqueID();

        //Get The Client ID in the Database
        var clientId = prompt(options);
        clientId = DisplayAndValidation.verifyResultExistByUniqueID(clientId, clientsDatabase, "Clients");

        if(clientId == -1)
            return;
        
        //Delete the Selected Client by Database ID
        alert("The Client " + clientsDatabase[clientId].firstName + " " + clientsDatabase[clientId].lastName + " has been deleted!");
        clientsDatabase.splice(clientId, 1);
    }
}
var eventIDCounter = 1;
var clientIDCounter = 1;

function PopulateDefaultEvents()
{
    new Event("Gallery Opening");
    new Event("Horror Cinema Night", true);
    new Event("Friday Parti in Da Club", true);
    new Event("Theater Night");
    new Event("Traveling at Midnight", true);
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

//Main Script

//Initialize Database
InitDatabase();

var isRunning = true;

while(Menu.isRunning)
{
    Menu.mainMenu();
}
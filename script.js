var eventIDCounter = 1;
var clientIDCounter = 1;

function PopulateDefaultEvents()
{
    new Event("Gallery Opening");
    new Event("Horror Cinema Night", 15, true);
    new Event("Friday Parti in Da Club", 30, true);
    new Event("Theater Night", 7);
    new Event("Traveling at Midnight", 50, true);
}

function PopulateDefaultClients()
{
    new Client("Tom", "Hardy", true, 38, 100);
    new Client("Elon", "Dusk", true, 35);
    new Client("Lara", "Raider", false, 25, 500);
    new Client("Merry", "Larson", false, 18);
    new Client("Betty", "Lue", false, 8, 2);
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
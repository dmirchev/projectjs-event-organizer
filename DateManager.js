var DateManager = 
{
    "months" : ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"],

    "getCurrentDate" : function()
    {
        return new Date();
    },

    "displayDateAlert" : function(date)
    {
        var message = "The Date is " + date.getDate() + " of " + this.months[date.getMonth()] 
        + " " + date.getFullYear();

        alert(message);
    },

    "displayDateAsMessage" : function(date)
    {
        var message = "On the " + date.getDate() + " of " + this.months[date.getMonth()] 
        + " " + date.getFullYear();

        return message;
    },

    "setDate" : function()
    {
        var day = -1;
        var month = -1;
        var year = -1;
        var wait = true;

        currentDate = new Date();
        
        while(wait)
        {
            //Get The Year
            if(year == -1)
                year = prompt("Please Ender the Year of the Event.");

            if(year == null)
            {
                //Menu.retrurnToEventMenu();
                return null;
            }

            console.log(month);

            //Chech if the year is before the current year
            if(year < currentDate.getFullYear())
            {
                var difference = currentDate.getFullYear() - year;
                alert("The Year " + year + " has passed before " +  difference + " years");

                year = -1;

                continue;
            }

            //Get The Month
            if(month == -1)
            {
                month = prompt("Please Ender the Month of the Event.\n\n" + this.monthListMessage);
                //month--;
            }

            if(month == null)
            {
                month = -1;
                year = -1;
                continue;
            }
               
            //Check if the given month is in the list
            if(month < 1 || month > 12)
            {
                alert("There is not a Month with the Index: " + month);

                month = -1;

                continue;
            }

            //Get The Day
            if(day == -1)
                day = prompt("Please Ender the Day of the Event.");

            if(day == null)
            {
                day = -1;
                month = -1;
                continue;
            }

            //Check if the Day is Negative
            if(day < 1)
            {
                alert("You cannot set a Negative Number or 0 as a Day");
                day = -1;
                continue;
            }

            //Check if the Day is in the Month Februray
            if(month == 2)
            {
                if(this.isLeapYear(year) && day > 29)
                {
                    alert("The Month February of the Year " + year + " has only 29 days");
                    day = -1;
                    continue;
                }
                else if(!this.isLeapYear(year) && day > 28)
                {
                    alert("The Month February of the Year " + year + " has only 28 days");
                    day = -1;
                    continue;
                }
            }

            //Check if the Day is in any of the Months
            if(month % 2 == 0 && day > 30
            || month % 2 == 1 && day > 31)
            {
                month--;
                alert("The Month " + this.months[0] + " does not have " + day + " Days");

                day = -1;
                continue;
            }

            wait = false;
        }

        date = new Date(year, month, day);

        return date;
    },

    "isLeapYear" : function(year)
    {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },

    "monthListMessage" : "1 - January" + 
    "\n2 - February" + 
    "\n3 - March" + 
    "\n4 - April" + 
    "\n5 - May" + 
    "\n6 - June" +  
    "\n7 - July" + 
    "\n8 - August" + 
    "\n9 - September" +
    "\n10 - October" +
    "\n11 - November" +
    "\n12 - December"
}
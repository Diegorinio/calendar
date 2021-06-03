const calendar = document.querySelector("#Calendar");
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["pon", "wto", "śrd", "czw", "pią", "sob", "nie"]
getDaysInMonth = (year, month) =>{
    return new Date(year, month,0).getDate();
}
getFirstDayinMonth = (year, month) =>{
    return new Date(year, month, 1).getDay();
}
let calendarList = document.querySelector('.calendar-list');
let date = new Date();
let act_month;
let act_year;
act_month = date.getMonth();
act_year = date.getFullYear();
console.log(act_month)
function Calendar(year, month)
{
    calendarList.className = "calendar-list"
    let data = new Date(year, month, 1);
    act_month = month;
    let daysInMonth = getDaysInMonth(data.getFullYear(), data.getMonth()+1);
    ClearCalendar();
    let firstDayInMonthPosition = getFirstDayinMonth(data.getFullYear(), data.getMonth())-1
    document.querySelector('.date-name').innerHTML = `${data.getFullYear()} ${months[data.getMonth()]}`

    if(firstDayInMonthPosition<0)
    {
        firstDayInMonthPosition =6;
    }

    for(x=0;x<=dayNames.length-1;x++)
    {
        calendarList.insertAdjacentHTML('beforeend', `<div>${dayNames[x]}</div>`)
    }

    for(day=1;day<=daysInMonth + firstDayInMonthPosition;day++)
    {
        if(day<= firstDayInMonthPosition)
        {
            calendarList.insertAdjacentHTML('beforeend',`<div class='calendar-list-element'></div>`)
        }
        else
        {
            let style;
            if(day%7==0)
            {
                style = "color:red";
            }
            else
            {
                style= "color:black";
            }
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element' id=${day} style=${style}>${day- firstDayInMonthPosition}</div>`)
        }
    }
}

function DisplayCalendarMonths()
{
    ClearCalendar();
    calendarList.className = "calendar-list-months"
    for(month=0;month<=months.length-1;month++)
    {
        calendarList.insertAdjacentHTML('beforeend',`<div class='calendar-list-element-year' onclick='Calendar(${act_year},${month})'>${months[month]}</div>`)
    }
}

function DisplayMonthDays()
{
    Calendar(act_year, act_month)
}

function ClearCalendar()
{
    calendarList.innerHTML = "";
}

function prevMonth()
{
    console.log("prev")
    Calendar(act_year, act_month-=1);
}
function nextMonth()
{
    console.log("next")
    Calendar(act_year, act_month+=1);
}


Calendar(act_year, act_month);

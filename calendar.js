const calendar = document.querySelector("#Calendar");
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["pon", "wto", "śrd", "czw", "pią", "sob", "nie"]
getDaysInMonth = (year, month) =>{
    return new Date(year, month,0).getDate();
}
getFirstDayinMonth = (year, month) =>{
    return new Date(year, month, 1).getDay();
}
let date = new Date();
let act_month;
let act_year;
act_month = date.getMonth();
act_year = date.getFullYear();
function Calendar(year, month)
{
    let data = new Date(year, month);
    let daysInMonth = getDaysInMonth(data.getFullYear(), data.getMonth());
    let calendarList = document.querySelector('.calendar-list');
    calendarList.innerHTML = "";
    let firstDayInMonthPosition = getFirstDayinMonth(data.getFullYear(), data.getMonth())
    console.log(data)
    document.querySelector('.date-name').innerHTML = `${data.getFullYear()} ${months[data.getMonth()]}`

    if(firstDayInMonthPosition===0)
    {
        firstDayInMonthPosition = 7;
    }
    console.log(firstDayInMonthPosition)
    console.log(data.getMonth())

    for(x=0;x<=dayNames.length-1;x++)
    {
        calendarList.insertAdjacentHTML('beforeend', `<div>${dayNames[x]}</div>`)
    }
    for(day=1;day<=daysInMonth+firstDayInMonthPosition-1;day++)
    {
        if(day<firstDayInMonthPosition)
        {
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element' id='${day}'></div>`)
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
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element' id=${day} style=${style}>${day-firstDayInMonthPosition+1}</div>`)
        }
    }
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

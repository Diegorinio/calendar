const calendar = document.querySelector("#Calendar");
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["pon", "wto", "śrd", "czw", "pią", "sob", "nie"]
getDaysInMonth = (year, month) =>{
    return new Date(year, month,0).getDate();
}
getFirstDayinMonth = (year, month) =>{
    return new Date(year, month, 1).getDay();
}

function CalenendarInit(year, month)
{
    let date = new Date();
    let daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth()+1);
    let calendarList = document.querySelector('.calendar-list');
    let firstDayInMonthPosition = getFirstDayinMonth(date.getFullYear(), date.getMonth())
    document.querySelector('.date-name').innerHTML = `${date.getFullYear()} ${months[date.getMonth()]}`

    if(firstDayInMonthPosition===0)
    {
        firstDayInMonthPosition = 7;
    }
    console.log(firstDayInMonthPosition)
    console.log(date.getMonth())

    for(x=0;x<=dayNames.length-1;x++)
    {
        calendarList.insertAdjacentHTML('beforeend', `<div>${dayNames[x]}</div>`)
    }
    for(day=1;day<=daysInMonth+firstDayInMonthPosition-1;day++)
    {
        if(day<firstDayInMonthPosition)
        {
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element'></div>`)
        }
        else
        {
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element'>${day-firstDayInMonthPosition+1}</div>`)
        }
    }
}

CalenendarInit();

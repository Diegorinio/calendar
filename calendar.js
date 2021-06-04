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
    setActualMonth(month);
    setActualYear(year)
    let daysInMonth = getDaysInMonth(data.getFullYear(), data.getMonth()+1);
    ClearCalendar();
    ShowCalendarOptions("block");
    let firstDayInMonthPosition = getFirstDayinMonth(data.getFullYear(), data.getMonth())-1
    document.querySelector('.date-name').textContent = `${data.getFullYear()} ${months[data.getMonth()]}`

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
            calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-list-element-day' id=${day-firstDayInMonthPosition} style=${style} onclick="DayEventWindow(this)" state="closed">${day- firstDayInMonthPosition}</div>`)
        }
    }
}

function DisplayCalendarMonths()
{
    ClearCalendar();
    ShowCalendarOptions("none");
    calendarList.className = "calendar-list-months";
    for(month=0;month<=months.length-1;month++)
    {
        calendarList.insertAdjacentHTML('beforeend',`<div class='calendar-list-element-months' onclick='Calendar(${GetActualYear()},${month})'>${months[month]}</div>`)
    }
}

function DayEventWindow(e)
{

    if(document.getElementsByClassName('note-event-window').length>0)
    {
        console.warn('element already exist')
    }
    else
    {
        console.log(e.id)
    let NoteEventWindow = document.createElement("div");
    NoteEventWindow.className = "note-event-window";
    NoteEventWindow.textContent = `${e.id} ${months[GetActualMonth()]} ${GetActualYear()}\n Dodaj notatkę`
    let NoteEventText = document.createElement("textarea");
    NoteEventText.className = 'note-event-textarea'
    NoteEventWindow.appendChild(NoteEventText);
    let NoteEventBtn = document.createElement("button");
    let NoteEventExit = document.createElement("button");
    NoteEventExit.className = 'event-note-btn-exit'
    NoteEventExit.textContent = "Zamknij";
    NoteEventBtn.className = 'event-note-btn-save';
    NoteEventBtn.textContent = 'Zapisz';
    NoteEventBtn.addEventListener("click",()=>{
        NoteEventText.blur();
        AddEventOnThisDay(e.id, NoteEventText.value)
        NoteEventWindow.remove();
    })
    NoteEventExit.addEventListener("click",()=>{
        NoteEventWindow.remove();
    })
    calendarList.appendChild(NoteEventWindow);
    NoteEventWindow.appendChild(NoteEventBtn);
    NoteEventWindow.appendChild(NoteEventExit);
    NoteEventText.focus();
    }
}

function AddEventOnThisDay(day_id, message)
{
    console.log(day_id, act_month, act_year)
    let NotesFromStorage
    console.log(localStorage.getItem("notes"))
    if(localStorage.getItem("notes")!= null)
    {
        NotesFromStorage = [JSON.parse(localStorage.getItem("notes"))]
    }
    else
    {
        NotesFromStorage = []
    }
        console.log(NotesFromStorage)
        const note = {year: GetActualYear(), month: GetActualMonth(), day: day_id, note: message}
        NotesFromStorage.push(note)
        localStorage.setItem("notes",JSON.stringify(NotesFromStorage))
        console.log(localStorage.getItem("notes"))
}

function DisplayCalendarYears()
{
    ClearCalendar();
    ShowCalendarOptions("none")
    calendarList.className = "calendar-list-years";
    let select = document.createElement("select")
    for(year=1900;year<=date.getFullYear()+8;year++)
    {
        let option = document.createElement("option");
        option.text = year;
        select.appendChild(option);
    }
    calendarList.appendChild(select);
    let button = document.createElement("button");
    button.className = "calendar-year-select-btn";
    button.innerHTML = "GO"
    button.addEventListener("click", function(){
        setActualYear(select.value);
        DisplayCalendarMonths();
    })
    calendarList.appendChild(button);
}
GetActualYear = () =>{
    return act_year;
}
GetActualMonth = () =>{
    return act_month;
}
function setActualYear(year)
{
    act_year = year;
}
function setActualMonth(month)
{
    act_month = month;
}
function DisplayMonthDays()
{

    Calendar(GetActualYear(), GetActualMonth())
}
function ShowCalendarOptions(show)
{
    document.querySelector('.calendar-options').style.display = show;
}

function ClearCalendar()
{
    calendarList.innerHTML = "";
}

function prevMonth()
{
    console.log("prev")
    Calendar(act_year, GetActualMonth()-1);
}
nextMonth =()=>
{
    console.log("next")
    Calendar(act_year, GetActualMonth()+1);
}

Calendar(act_year, GetActualMonth());

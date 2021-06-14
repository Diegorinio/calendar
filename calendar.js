const calendar = document.querySelector("#Calendar");
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["pon", "wto", "śrd", "czw", "pią", "sob", "nie"]
var calendarList;
var act_month;
var act_year;

function init()
{
    let lastSeenView = GetViewJSON();
    calendarList = document.querySelector('.calendar-list');
    if(lastSeenView != null)
    {
        setActualYear(lastSeenView.year);
        setActualMonth(lastSeenView.month);
        switch(lastSeenView.view)
        {
            case "calendar-years":
                DisplayCalendarYears();
                break;
            case "calendar-months":
                DisplayCalendarMonths();
                break;
            case "calendar-days":
                Calendar(GetActualYear(), GetActualMonth());
        }
    }
    else
    {
        let date = new Date();
        act_month = date.getMonth();
        act_year = date.getFullYear();
        Calendar(GetActualYear(), GetActualMonth());
    }
    ShowSavedEvents();
}

function getDaysInMonth(year, month){
    return new Date(year, month,0).getDate();
}
function getFirstDayinMonth(year, month){
    return new Date(year, month, 1).getDay();
}

function Calendar(year, month)
{
    SetView("calendar-days", year, month)
    calendarList.className = "calendar-list"
    let data = new Date(year, month, 1);
    setActualMonth(month);
    setActualYear(year)
    let daysInMonth = getDaysInMonth(data.getFullYear(), data.getMonth()+1);
    ClearCalendar();
    ShowCalendarOptions("block");
    let firstDayInMonthPosition = getFirstDayinMonth(data.getFullYear(), data.getMonth())-1
    document.querySelector('.date-name').innerHTML = `<div>${data.getFullYear()}</div> <div>${months[data.getMonth()]}</div>`;

    if(firstDayInMonthPosition<0)
    {
        firstDayInMonthPosition =6;
    }

    for(x=0;x<=dayNames.length-1;x++)
    {
        calendarList.insertAdjacentHTML('beforeend', `<div class='calendar-week-days'>${dayNames[x]}</div>`)
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
    SetView("calendar-months", GetActualYear(), GetActualMonth())
    ClearCalendar();
    ShowCalendarOptions("none");
    calendarList.className = "calendar-list-months";
    for(month=0;month<=months.length-1;month++)
    {
        calendarList.insertAdjacentHTML('beforeend',`<div class='calendar-list-element-months' onclick='Calendar(${GetActualYear()},${month})'>${months[month]}</div>`)
    }
}

DayEventWindow= (e)=>
{

    if(document.getElementsByClassName('note-event-window').length>0)
    {
        console.warn('element already exist')
    }
    else
    {
    let NoteEventWindow = document.createElement("div");
    NoteEventWindow.className = "note-event-window";
    NoteEventWindow.innerHTML = `<span class='note-event-window-val'>${e.id} ${months[GetActualMonth()]} ${GetActualYear()}</span> <div class='note-event-window-msg'>Dodaj notatkę</div>`
    let NoteEventText = document.createElement("textarea");
    NoteEventText.className = 'note-event-textarea'
    NoteEventText.setAttribute("minlength", "1");
    NoteEventText.setAttribute("placeholder", "Dodaj zdarzenie");
    NoteEventWindow.appendChild(NoteEventText);
    let NoteEventBtn = document.createElement("button");
    let NoteEventExit = document.createElement("button");
    NoteEventExit.className = 'event-note-btn-exit'
    NoteEventExit.textContent = "Zamknij";
    NoteEventBtn.className = 'event-note-btn-save';
    NoteEventBtn.textContent = 'Zapisz';
    NoteEventBtn.addEventListener("click",()=>{
        if(NoteEventText.value.length>0)
        {
            NoteEventText.blur();
            AddEventOnThisDay(e.id, NoteEventText.value)
            NoteEventWindow.remove();
        }
        else
        {
            NoteEventText.setAttribute("Placeholder", "Dodaj zdarzenie!");
        }
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

AddEventOnThisDay = (day_id, message)=>
{
    console.log(day_id, act_month, act_year);
    if(message.length<0)
    {
        message = "  "
    }
    let NotesFromStorage;
    console.log(localStorage.getItem("notes"));
    if(localStorage.getItem("notes")!= null)
    {
        NotesFromStorage = JSON.parse(localStorage.getItem("notes"));
    }
    else
    {
        NotesFromStorage = [];
    }
        console.log(NotesFromStorage);
        const note = {year: GetActualYear(), month: GetActualMonth(), day: day_id, note: message};
        NotesFromStorage.push(note);
        localStorage.setItem("notes",JSON.stringify(NotesFromStorage));
        console.log(localStorage.getItem("notes"));
        ShowSavedEvents();
}

function ShowSavedEvents()
{

    let notes = JSON.parse(GetSavedEvents());
    if(document.querySelectorAll('.note-event-box').length>0)
    {
        document.querySelectorAll('.note-event-box').forEach(element => {
            element.remove();
        });
    }
    if(notes !=null)
    {
        console.log(notes)
        for(x=0; x<=notes.length-1;x++)
        {
            let NoteEvent = document.createElement("div");
            NoteEvent.className = "note-event-box";
            NoteEvent.id = x;
            NoteEvent.innerHTML =  `<div class='note-event-box-content'>${notes[x].day} ${months[notes[x].month]} ${notes[x].year}</div><div class='note-event-box-content-text'>${notes[x].note}</div>`;
            document.body.appendChild(NoteEvent);
        }

    }
}
function GetSavedEvents()
{
    return localStorage.getItem("notes")
}
function SetView(model, year, month)
{
    const view = {view: model, year: year, month: month}
    localStorage.setItem("view", JSON.stringify(view))
}

function GetViewJSON(){
    return JSON.parse(localStorage.getItem("view"));
}
function DisplayCalendarYears()
{
    SetView("calendar-years", GetActualYear(), GetActualMonth())
    ClearCalendar();
    ShowCalendarOptions("none")
    calendarList.className = "calendar-list-years";
    let select = document.createElement("select")
    select.classList = "calendar-year-select"
    for(year=1900;year<=2050;year++)
    {
        let option = document.createElement("option");
        option.text = year;
        select.appendChild(option);
    }
    calendarList.appendChild(select);
    select.value = GetActualYear();
    let button = document.createElement("button");
    button.className = "calendar-year-select-btn";
    button.innerHTML = "Wybierz"
    button.addEventListener("click", function(){
        setActualYear(select.value);
        DisplayCalendarMonths();
    })
    calendarList.appendChild(button);
}
function GetActualYear(){
    return act_year;
}
function GetActualMonth(){
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
function nextMonth()
{
    console.log("next")
    Calendar(act_year, GetActualMonth()+1);
}

document.addEventListener("DOMContentLoaded", ()=>{
    init();
})
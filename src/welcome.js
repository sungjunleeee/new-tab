//@ts-check
const welcome   = document.querySelector(".js-welcome");
const userForm  = document.querySelector(".js-username");
const todoWel   = document.querySelector(".js-todo");
const userInput = userForm.querySelector("input");
const USERNAME  = "username";
const SHOW_CN   = "showing";

function handleSubmit(event) {
    event.preventDefault();
    const username = userInput.value;
    localStorage.setItem(USERNAME, username);
    welcomeUser(username);
}

function askForName() {
    welcome.innerHTML = `What's your name?`;
    userForm.classList.add(SHOW_CN);
    userForm.addEventListener("submit", handleSubmit);
}

function welcomeUser(username) {
    userForm.classList.remove(SHOW_CN);
    welcome.classList.add(SHOW_CN);
    welcome.innerHTML = `How are you, ${username}?😃`;
    todoWel.classList.add(SHOW_CN);
}


function init() {
    const username = localStorage.getItem(USERNAME);
    if (username === null) {
        askForName();
    } else{
        welcomeUser(username);
    }
}

init();
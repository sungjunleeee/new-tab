//@ts-check
const clock     = document.querySelector(".js-clock");
const todoBlock = document.querySelector(".js-todo");
const todoForm  = todoBlock.querySelector("form");
const todoInput = todoBlock.querySelector("input");
const todoList  = todoBlock.querySelector(".js-todoList");  

let todo = [];
const TODO_ID   = "uniqueID";
const TODO_LS   = "todoList";

function todoSubmit(event) {
    event.preventDefault();
    const currentInput = todoInput.value;
    if (currentInput !== "") {
        addTodo(currentInput);
    } else {
        alert("Check your input.");
    }
    todoInput.value = "";
}

function addTodo(text){
    const newID = genID();
    todo.push({"text": text, id: newID});
    updateLS();
}

function deleteTodo(event){
    const currentID = event.target.parentNode.id;
    todo = todo.filter((todo) => {
        return currentID != todo.id;
    })
    updateLS();
}

function updateLS(){
    localStorage.setItem(TODO_LS, JSON.stringify(todo));
    loadLS();
}

function loadLS(){
    todoList.innerHTML = "";
    const loadedTodo = localStorage.getItem(TODO_LS);
    if (loadedTodo !== null && loadedTodo !== "[]") {
        todo = JSON.parse(loadedTodo);
        todo.forEach((todo) => {
            const p = document.createElement("p");
            const check = document.createElement("button");
            const span = document.createElement("span");
            check.innerText = "✔️";
            span.innerText = todo.text;
            check.addEventListener("click", deleteTodo);

            p.id = todo.id;
            p.appendChild(check);
            p.appendChild(span);
            todoList.appendChild(p);
        })
    }
}

function genID() {
    if (todo.length !== 0){
        return todo[todo.length - 1].id + 1;
    } else {
        return 1;
    }
}

function showClock() {
    const now       = new Date();
    const hour      = now.getHours();
    const minute    = now.getMinutes();
    const second    = now.getSeconds();
    clock.innerHTML =   `${hour < 10 ? `0${hour}` : `${hour}`}:` +
                        `${minute < 10 ? `0${minute}` : `${minute}`}:` +
                        `${second < 10 ? `0${second}` : `${second}`}`;
}

function todoInit(){
    showClock();
    loadLS();
    setInterval(showClock, 1000);
    todoForm.addEventListener("submit", todoSubmit);
}

todoInit();
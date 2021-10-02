const toDoListElement = document.getElementById("toDoList")
const doneListElement = document.getElementById("doneTasks")
const countersElement = document.getElementById("counters")

let toDos = []
let doneT = []
let openT = []
//const storedData = window.localStorage.getItem("toDoTasks")

async function init() {
    const response = await fetch('/task')
    let storedData = []
    if (response.ok) {
        toDos = await response.json()
    }

    console.log(toDos)
    doneT = toDos.filter(toDo => toDo.done === true)
    openT = toDos.filter(toDo => toDo.done === false)
    renderTask()
}
//initialise
init()

const itemToggle = (index) => {
    let toDo = toDos[index]
    toDo.done = !toDo.done
    _sendUpdate(index)
    renderTask()
}

function editTask(index) {
    renderTask()
    let editRow = document.getElementById("taskIndex" + index)
    editRow.innerHTML = `
    <div class="editWrapper">
    <div>
    <input type="text" id="editBox" value="${toDos[index].value}">
    </div>
    </div>
    <div class="buttons">
    <div onclick="saveEdit(${index})" class="icon save" type="button"></div>
    <div onclick="renderTask()" class="icon abort" type="button"></div>
    </div>
    `
    document.getElementById("editBox").focus()
    document.getElementById("editBox").addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            saveEdit(index);
        }
    });
}

function _sendUpdate(index) {
    fetch('/task', {
        method: "PUT",
        body: JSON.stringify(toDos[index]),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

function saveEdit(id) {
    if (!document.getElementById("editBox").value) {
        return
    }
    toDos[id].value = document.getElementById("editBox").value
    _sendUpdate(id)
    renderTask()

}

function done() {
    renderTask()
}


document.getElementById("taskBox").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        createTask();
    }
});

async function createTask() {
    let taskBox = document.getElementById("taskBox");
    let task = taskBox.value;
    if (!task) {
        return;
    }
    let result = await fetch('/task', {
        method: "POST",
        body: JSON.stringify({
            done: false,
            value: task
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    if (!result.ok) {
        console.log('Creation failed')
        return
    }
    const toDoObject = await result.json()
    toDos.push(toDoObject)
    renderTask()
    taskBox.value = "";
}

function deleteTask(index) {
    const taskId = toDos[index]._id
    delete toDos[index]
    toDos = toDos.filter(toDo => toDo)
    fetch(`/task/${taskId}`, {
        method: "DELETE"
    })
    renderTask()
    closeModal()
}

function noOpen() {
    if (openT.length == 0) {
        toDoListElement.innerHTML += `
        <div class="noTaskLeft noOpen"></div>
        `
    }
}

function noClosed() {
    if (doneT.length == 0) {
        doneListElement.innerHTML += `
        <div class="noTaskLeft noClosed"></div>
        `
    }
}


function renderTask() {
    toDoListElement.innerHTML = ''
    doneListElement.innerHTML = ''
    countersElement.innerHTML = ''

    doneT = toDos.filter(toDo => toDo.done === true)
    openT = toDos.filter(toDo => toDo.done === false)
    toDos.forEach(
        (task, index) => {
            const checked = task.done ? 'checked' : ''
            const taskClass = task.done ? 'done' : ''

            if (task.done === false) {
                toDoListElement.innerHTML += `
                    <div class='taskItem ${taskClass}' id="taskIndex${index}">
                        <label class="container taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                            <span class="checkmark"></span>
                        </label>
                        <div class="buttons">
                            <div type='button' value='Edit' class="icon edit" onclick="editTask(${index});"></div>
                            <div type='button' value='Delete' class="icon delete" onclick="displayModal(${index})"></div>
                        </label>
                    </div>
                `
            } else if (task.done === true) {
                doneListElement.innerHTML += `
                    <div class='taskItem ${taskClass}'>
                        <label class="container taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                            <span class="checkmark"></span>
                        </label>
                        <div class="buttons">
                        <div type='button' value='Delete' class="icon delete" onclick="displayModal(${index})"></div>
                        </div>
                    </div>
                `
            }

        }
    )
    counters()
    window.localStorage.setItem("toDoTasks", JSON.stringify(toDos));
    noOpen()
    noClosed()
}

function counters() {
    countersElement.innerHTML += `
    <div class="count"><strong> ${openT.length}</strong> <br>  open Tasks</div>
    <div class="count"><strong> ${doneT.length}</strong> <br> done Tasks</div>
    <div class="count"><strong> ${openT.length + doneT.length}</strong> <br>  all Tasks</div>

    `
}

renderTask(toDos)
// doneTask(doneT)

function renderDarkMode() {
    const bodyElement = document.getElementsByTagName('body')[0]
    let darkModeStorage = window.localStorage.getItem("darkMode") === "true"
    if (darkModeStorage) {
        bodyElement.classList.add('darkMode')
        document.querySelector("#darkMode").checked = true
    } else {
        bodyElement.classList.remove('darkMode')
    }
}

function toggleDarkMode() {
    let darkModeStorage = window.localStorage.getItem("darkMode") === "true"
    window.localStorage.setItem("darkMode", !darkModeStorage)
    renderDarkMode()
}

renderDarkMode()

// Modal Window

let modal = document.getElementById('deleteTaskModal')
let confirmBtn = document.getElementById('confirm')

function displayModal(index) {
    if (modal.style.display = 'none') {
        modal.style.display = 'block'
    }
    confirmBtn.onclick = function () {
        deleteTask(index)
    }
}

function closeModal() {
    if (modal.style.display = 'block') {
        modal.style.display = 'none'
    }
}

// Close the modal when clicking outside it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
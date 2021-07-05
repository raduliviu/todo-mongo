const toDoListElement = document.getElementById("toDoList")

const toDos = [
    toDo1 = {
        done: true,
        value: 'Take out the trash'
    },
    toDo2 = {
        done: false,
        value: 'Walk the dog'
    },
    toDo3 = {
        done: true,
        value: 'Go outside'
    }

]

const itemToggle = (index) => {
    let toDo = toDos[index]
    toDo.done = !toDo.done
    renderTask()
}

function editTask(index) {
    let task = prompt("Change the task:")
    let toDo = toDos[index]
    if (input === null) {
        return;
    }
    else if (task !=="") {
    toDo.value = task
}
    renderTask()
}

function createTask() {
    let task = prompt("Add your new task")
    let toDoX = {
        done: false,
        value: task
    }
    if (input === null) {
        return;
    }
    else if (task !==""){
        toDos.push(toDoX)
    } 
    renderTask()
}


function deleteTask(index) {
    if (confirm("Are you sure you want to delete this?")) {
        delete toDos[index]
        renderTask()
    }
}

function renderTask() {
    toDoListElement.innerHTML = ''
    toDos.forEach(
        (task, index) => {
            const checked = task.done ? 'checked' : ''
            const taskClass = task.done ? 'done' : ''

            toDoListElement.innerHTML += `
            <div class='taskItem ${taskClass}'>
                <input type='checkbox' ${checked} onclick="itemToggle(${index})">
                ${task.value}
                <button type='button' value='Edit' onclick="editTask(${index});">Edit</button>
                <button type='button' value='Delete' onclick="deleteTask(${index})">Delete</button>
            </div>
        `
        }
    )
}

renderTask(toDos)
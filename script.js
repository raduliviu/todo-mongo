const toDoListElement = document.getElementById("toDoList")
const doneListElement = document.getElementById("doneTasks")
const countersElement = document.getElementById("counters")

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

let doneT = toDos.filter(toDo => toDo.done === true)

let openT = toDos.filter(toDo => toDo.done === false)

const itemToggle = (index) => {
    let toDo = toDos[index]
    toDo.done = !toDo.done
    renderTask()
}

function editTask(index) {
    let task = prompt("Change the task:")
    let toDo = toDos[index]
    if (task === null) {
        return;
    } else if (task !== "") {
        toDo.value = task
    }
    renderTask()
}

function done() {
    renderTask()
}

function createTask() {
    let task = prompt("Add your new task")
    let toDoX = {
        done: false,
        value: task
    }
    if (task === null) {
        return;
    } else if (task !== "") {
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
                    <div class='taskItem ${taskClass}'>
                        <div class="taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                        </div>
                        <div class="buttons">
                            <button type='button' value='Edit' onclick="editTask(${index});">Edit</button>
                            <button type='button' value='Delete' onclick="deleteTask(${index})">Delete</button>
                        </div>
                    </div>
                `
            } else if (task.done === true) {
                doneListElement.innerHTML += `
                    <div class='taskItem ${taskClass}'>
                        <div class="taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                        </div>
                        <div class="buttons">
                            <button type='button' value='Delete' onclick="deleteTask(${index})">Delete</button>
                        </div>
                    </div>
                `
            }

        }
    )
    counters()


}

function counters() {
    countersElement.innerHTML += `
    <div>${doneT.length} done Tasks</div>
    <div>${openT.length} open Tasks</div>
    <div>${openT.length + doneT.length} all Tasks</div>

    `
}


// function doneTask() {
//     doneT = toDos.filter(toDo => toDo.done === true)
//     doneListElement.innerHTML = ''
//     doneT.forEach(
//         (task, index) => {
//             const checked = task.done ? 'checked' : ''
//             const taskClass = task.done ? 'done' : ''

//             doneListElement.innerHTML += `
//             <div class='taskItem ${taskClass}'>
//                 <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
//                 ${task.value}
//                 <button type='button' value='Edit' onclick="editTask(${index});">Edit</button>
//                 <button type='button' value='Delete' onclick="deleteTask(${index})">Delete</button>
//             </div>
//         `
//         }
//     )
// }
renderTask(toDos)
    // doneTask(doneT)
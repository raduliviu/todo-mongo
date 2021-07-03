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
                <button type='button' value='Edit'>Edit</button>
                <button type='button' value='Delete'>Delete</button>
            </div>
        `
        }
    )
}

renderTask(toDos)
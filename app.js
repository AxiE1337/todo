
const todoAddBtn = document.querySelector('#todo-add-btn')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
const form = document.querySelector('#form')

getTodoLocal ()

todoAddBtn.addEventListener('click', todoAdd)
todoList.addEventListener('click', removeLi)

function todoAdd (event) {
    event.preventDefault()

    maxCapacity ()
    
    if (todoInput.value.length < 1) {
        todoAddBtn.style.backgroundColor = 'red'
        todoInput.disabled = isdesabled
    } else todoAddBtn.style.backgroundColor = ''
   
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div')

    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-li')
    todoLi.innerText = todoInput.value
    todoDiv.appendChild(todoLi)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-button')
    deleteBtn.innerText = 'Delete'
    todoDiv.appendChild(deleteBtn)

    todoList.appendChild(todoDiv)

    saveTodoLocal (todoInput.value)

    todoInput.value = ''
}

function maxCapacity () {
    if (JSON.parse(localStorage.getItem('todos')).length > 7 ) {
        form.classList.add('max')
        todoAddBtn.style.backgroundColor = 'red'
        todoInput.value = ''
        
    } else {
        form.classList.remove('max')
        todoAddBtn.style.backgroundColor = 'red'
    }    
}

function saveTodoLocal (todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodoLocal () {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo-div')

        const todoLi = document.createElement('li')
        todoLi.classList.add('todo-li')
        todoLi.innerText = todo
        todoDiv.appendChild(todoLi)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-button')
        deleteBtn.innerText = 'Delete'
        todoDiv.appendChild(deleteBtn)

        todoList.appendChild(todoDiv)
    })
}

function removeTodoLocal (todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLi (event) {
    const item = event.target
    if (item.classList[0] === 'delete-button') {
        const todo = item.parentElement
        setTimeout ( () => {
            removeTodoLocal (todo)
            todo.remove()
        }, 500)    
        todo.classList.add('del')
    }
}
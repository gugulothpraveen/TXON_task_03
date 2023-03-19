const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.getElementById('filter-buttons');

let todos = [];

// Add a new todo item
function addTodoItem(event) {
  event.preventDefault();
  if (input.value.trim() !== '') {
    const todo = {
      id: Date.now(),
      task: input.value.trim(),
      completed: false
    };
    todos.push(todo);
    input.value = '';
    displayTodoList();
  }
}

// Display the todo list
function displayTodoList() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    if (todo.completed) {
      todoItem.classList.add('completed');
    }
    const task = document.createElement('div');
    task.classList.add('task');
    task.textContent = todo.task;
    todoItem.appendChild(task);
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
      todo.completed = true;
      displayTodoList();
    });
    buttons.appendChild(completeButton);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      todos = todos.filter(item => item.id !== todo.id);
      displayTodoList();
    });
    buttons.appendChild(deleteButton);
    todoItem.appendChild(buttons);
    todoList.appendChild(todoItem);
  });
}

// Filter the todo list
function filterTodoList(event) {
  const filter = event.target.dataset.filter;
  filterButtons.querySelectorAll('.filter-button').forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');
  switch (filter) {
    case 'all':
      todos = todos.map(todo => ({ ...todo, completed: false }));
      break;
    case 'completed':
      todos = todos.map(todo => ({ ...todo, completed: true }));
      break;
    case 'incomplete':
      todos = todos.filter(todo => !todo.completed);
      break;
  }
  displayTodoList();
}

// Event listeners
form.addEventListener('submit', addTodoItem);
filterButtons.addEventListener('click', filterTodoList);

// Initial display of the todo list
displayTodoList();

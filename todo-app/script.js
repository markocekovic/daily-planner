const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// 1. Core function to create a task in the UI
function addTask() {
    const taskText = taskInput.value.trim(); // .trim() removes extra spaces

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = '';
    
    saveTasks(); // Save every time we add
}

// 2. Click Event for adding
addTaskBtn.addEventListener('click', addTask);

// 3. Keypress Event (Enter key)
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 4. List Interaction (Complete or Delete)
taskList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    } else if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
    saveTasks(); // Save the new state of the list
});

// 5. Local Storage: Save
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(task) {
        // We remove the text "Delete" from the string before saving
        const text = task.textContent.replace('Delete', '').trim();
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: text, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 6. Local Storage: Load
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}

// Initialize the list when the page opens
window.addEventListener('load', loadTasks);
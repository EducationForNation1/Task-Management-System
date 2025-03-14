document.addEventListener("DOMContentLoaded", loadTasks);

const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = { id: Date.now(), title, desc, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();

    taskTitle.value = "";
    taskDesc.value = "";
});

function renderTasks() {
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.desc}</p>
            </div>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDesc = prompt("Edit Task Description:", task.desc);

    if (newTitle !== null) task.title = newTitle;
    if (newDesc !== null) task.desc = newDesc;

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

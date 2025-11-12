const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Pre-filled example tasks
let tasks = [
  { text: "Task 1", completed: false },
  { text: "Task 2", completed: true },
  { text: "Task 3", completed: false },
  { text: "Task 4", completed: false },
  { text: "Task 5", completed: false },
  { text: "Task 6", completed: false },
  { text: "Task 7", completed: false },
  { text: "Task 8", completed: false }
];

function updateCounts() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  totalTasks.textContent = `Total Tasks: ${total}`;
  completedTasks.textContent = `Completed Tasks: ${completed}`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    if (task.completed) textSpan.classList.add("completed");

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      task.completed = true;
      renderTasks();
    };

    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);

    taskList.appendChild(li);
  });

  updateCounts();
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

renderTasks();

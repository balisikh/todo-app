const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let total = 0;
let completed = 0;

// Add task when button clicked
addBtn.addEventListener("click", addTask);

// Also add when Enter key pressed
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return alert("Please enter a task!");

  total++;
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <input type="checkbox" />
    <span>${taskText}</span>
    <div class="task-buttons">
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
  input.value = "";
  updateFooter();

  // Checkbox logic
  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) completed++;
    else completed--;
    updateFooter();
  });

  // Complete button
  li.querySelector(".complete-btn").addEventListener("click", () => {
    checkbox.checked = true;
    li.querySelector("span").style.textDecoration = "line-through";
    completed++;
    updateFooter();
  });

  // Delete button
  li.querySelector(".delete-btn").addEventListener("click", () => {
    if (checkbox.checked) completed--;
    li.remove();
    total--;
    updateFooter();
  });
}

function updateFooter() {
  totalTasks.textContent = `Total Tasks: ${total}`;
  completedTasks.textContent = `Completed: ${completed}`;
}

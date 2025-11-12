const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let total = 0;
let completed = 0;

addBtn.addEventListener("click", () => {
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

  li.querySelector(".delete-btn").addEventListener("click", () => {
    if (li.querySelector("input").checked) completed--;
    li.remove();
    total--;
    updateFooter();
  });

  li.querySelector("input").addEventListener("change", (e) => {
    if (e.target.checked) completed++;
    else completed--;
    updateFooter();
  });

  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.querySelector("input").checked = true;
    li.querySelector("span").style.textDecoration = "line-through";
    completed++;
    updateFooter();
  });
});

function updateFooter() {
  totalTasks.textContent = `Total Tasks: ${total}`;
  completedTasks.textContent = `Completed: ${completed}`;
}

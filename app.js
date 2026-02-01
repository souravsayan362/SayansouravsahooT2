import { saveTasks, loadTasks } from './modules/storage.js';
import { renderTaskList, updateCounter } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

let tasks = loadTasks();

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

// Initial render
renderTaskList(list, tasks);
updateCounter(tasks);

// Add task
form.addEventListener('submit', e => {
  e.preventDefault();

  const error = validateTaskInput(input.value);
  if (error) {
    errorMsg.textContent = error;
    return;
  }

  errorMsg.textContent = '';
  tasks.push(createTask(input.value));
  saveTasks(tasks);
  renderTaskList(list, tasks);
  updateCounter(tasks);
  input.value = '';
});

// Event delegation
list.addEventListener('click', e => {
  const taskEl = e.target.closest('.task');
  if (!taskEl) return;

  const id = Number(taskEl.dataset.id);
  const index = tasks.findIndex(t => t.id === id);

  // Delete
  if (e.target.classList.contains('delete-btn')) {
    if (confirm("Delete this task?")) {
      tasks.splice(index, 1);
    }
  }

  // Toggle
  if (e.target.type === 'checkbox') {
    tasks[index].completed = e.target.checked;
  }

  saveTasks(tasks);
  renderTaskList(list, tasks);
  updateCounter(tasks);
});

export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
  return JSON.parse(localStorage.getItem('tasks')) || [];
};
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}

export function renderTaskList(listEl, tasks) {
  listEl.innerHTML = '';

  if (tasks.length === 0) {
    listEl.innerHTML = `
      <li class="empty-state">
        <p>No tasks yet 🚀</p>
      </li>
    `;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </label>
      <button class="delete-btn">🗑️</button>
    `;

    listEl.appendChild(li);
  });
}

export function updateCounter(tasks) {
  const counter = document.getElementById('task-counter');
  const completed = tasks.filter(t => t.completed).length;
  counter.textContent = `Completed: ${completed} / ${tasks.length}`;
}
export function validateTaskInput(text) {
  if (!text.trim()) {
    return "Task cannot be empty!";
  }
  if (text.length > 50) {
    return "Task too long (max 50 chars)";
  }
  return null;
}

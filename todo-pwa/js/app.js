const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const offlineStatus = document.getElementById('offline-status');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Renderizar tarefas
function renderTasks() {
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">🗑</button>
    `;

    // Marcar como concluída
    li.querySelector('input').addEventListener('change', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Deletar tarefa
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Salvar no localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adicionar nova tarefa
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value.trim() === '') return;

  tasks.push({
    text: taskInput.value.trim(),
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = '';
});

// Limpar concluídas
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

// Detectar offline/online
window.addEventListener('online', () => {
  offlineStatus.textContent = '✅ Online';
  offlineStatus.classList.remove('offline');
});

window.addEventListener('offline', () => {
  offlineStatus.textContent = '📴 Offline (funcionando)';
  offlineStatus.classList.add('offline');
});

// Inicializar
renderTasks();
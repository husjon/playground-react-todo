export function addTask(task) {
  const id = crypto.randomUUID();
  task["id"] = id;
  localStorage.setItem(id, JSON.stringify(task));
}

export function getTasks() {
  const tasks = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = getTask(key);
    tasks.push(item);
  }
  return tasks;
}

export function getTask(id) {
  const item_raw = localStorage.getItem(id);
  const item = JSON.parse(item_raw);
  return item;
}

export function updateTask(id, { title = null, completed = null }) {
  const originalTask = getTask(id);
  const task = {
    ...originalTask,
    title: title !== null ? title : originalTask.title,
    completed: completed !== null ? completed : originalTask.completed,
  };
  localStorage.setItem(id, JSON.stringify(task));
}

export function deleteTask(id) {
  localStorage.removeItem(id);
}

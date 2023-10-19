import { useState } from "react";
import "./App.scss";
import { addTask, getTasks, updateTask } from "./storage";

export default function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState(getTasks());
  const [taskTitle, setTaskTitle] = useState("");

  function handleAddTask(e) {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      completed: false,
    };

    addTask(newTask);

    setTaskTitle("");
    setTasks(getTasks());
  }

  function handleTaskToggle(task) {
    updateTask(task.id, { completed: !task.completed });
    setTasks(getTasks());
  }

  return (
    <div className="TaskList">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </form>
      <ul className="Tasks">
        {tasks
          .sort((a, b) => a.completed - b.completed)
          .map((task) => (
            <Task task={task} key={task.id} onToggle={handleTaskToggle} />
          ))}
      </ul>
    </div>
  );
}

function Task({ task, onToggle }) {
  return (
    <li className="Task">
      <div className={`label ${task.completed ? "completed" : ""}`}>
        {task.title}
      </div>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
    </li>
  );
}

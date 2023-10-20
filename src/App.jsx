import { useState } from "react";
import "./App.scss";
import { addTask, getTasks, updateTask, deleteTask } from "./storage";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [selectedTask, setSlectedTask] = useState(null);

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
  function handleSelectTask(task) {
    if (selectedTask?.id !== task.id) setSlectedTask(task);
    else setSlectedTask(null);
  }
  function handleDeleteTask(task) {
    deleteTask(task.id);
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
          autoFocus
        />
      </form>
      <ul className="Tasks">
        {tasks
          .sort((a, b) => a.completed - b.completed)
          .map((task) => (
            <Task
              task={task}
              key={task.id}
              onToggle={handleTaskToggle}
              onSelect={handleSelectTask}
              selectedTask={selectedTask}
              onDelete={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
}

function Task({ task, onToggle, onSelect, selectedTask, onDelete }) {
  const isSelected = selectedTask?.id === task.id;

  return (
    <li className="Task">
      <div className="header">
        <div
          className={`label ${task.completed ? "completed" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => onSelect(task)}
        >
          {task.title}
        </div>
        <input
          className="checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
      </div>
      {isSelected && (
        <div className="controls">
          <Button onClick={() => onDelete(task)}>
            <DeleteIcon />
          </Button>
        </div>
      )}
    </li>
  );
}

function Button({ children, onClick }) {
  function handleClick(e) {
    e.preventDefault();
    if (onClick) onClick();
  }

  return <button onClick={handleClick}>{children}</button>;
}

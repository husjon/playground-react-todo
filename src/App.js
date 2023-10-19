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

  return (
    <div className="TaskList">
      <form>
        <input type="text" placeholder="Enter a task..." />
      </form>
      <ul className="Tasks">
        {tasks
          .sort((a, b) => a.completed - b.completed)
          .map((task) => (
            <Task task={task} key={task.id} />
          ))}
      </ul>
    </div>
  );
}

function Task({ task }) {
  return (
    <li className="Task">
      <div className={`label ${task.completed ? "completed" : ""}`}>
        {task.title}
      </div>
      <input className="checkbox" type="checkbox" checked={task.completed} />
    </li>
  );
}

import "./App.scss";
import { tasks } from "./data";

export default function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

function TaskList() {
  return (
    <div className="TaskList">
      <form>
        <input type="text" placeholder="Enter a task..." />
      </form>
      <ul className="Tasks">
        {tasks.map((task) => (
          <Task task={task} />
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

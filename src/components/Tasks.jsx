import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import DeleteTask from "./DeleteTask";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function Tasks({ task, fetchTasks, token }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(task.completed);

  async function handleCheckboxChange(e) {
    e.preventDefault();
    setCompleted(!completed);

    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });
    const info = await res.json();

    await fetchTasks();
  }

  const priorityToExclamation = {
    LOW: "!",
    MEDIUM: "!!",
    HIGH: "!!!",
  };

  // Get the corresponding exclamation points for the task priority
  const exclamationPoints = priorityToExclamation[task.priority] || "";

  // const dueDate = new Date(task.dueDate);
  // const updatedDueDate = dueDate.toLocaleDateString();

  let updatedDueDate = "";
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Display time in 12-hour format with AM/PM
      timeZoneName: "short", // Specify the time zone name
    };
    const formattedDate = dueDate.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dueDate.toLocaleTimeString("en-US", timeOptions); // Set the time zone to Eastern Standard Time (EST)
    updatedDueDate = `${formattedDate}, ${formattedTime}`;
  }

  return (
    <div className={"task-container"} key={task.id}>
      <p>{task.category.name}</p>
      <p>
        {exclamationPoints}
        <span className={completed ? "completed" : ""}>{task.title}</span>
      </p>
      <p className="description">{task.description}</p>

      {task.dueDate && <p className="date">{updatedDueDate}</p>}

      <div>
        <div className="checkbox-container">
          <label className="completed-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCheckboxChange}
            />
            Completed
          </label>
        </div>
        {user.id === task.userId && (
          <div className="icon-container">
            <Link to={`/editTasks/${task.id}`}>
              <button className="icon-buttons">
                <FaPencilAlt />
              </button>
            </Link>
            <DeleteTask task={task} />
          </div>
        )}
      </div>
    </div>
  );
}

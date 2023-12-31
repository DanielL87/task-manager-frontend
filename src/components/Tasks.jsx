import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import DeleteTask from "./DeleteTask";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function Tasks({ task, fetchTasks, token }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(task.completed);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const updateAlertMessage = () => {
      const dueDate = new Date(task.dueDate);
      const currentDate = new Date();
      const timeUntilDue = dueDate - currentDate;

      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (completed) {
          setAlertMessage("Task completed");
          setAlertVisible(true);
        } else if (dueDate < currentDate) {
          setAlertMessage("Task overdue");
          setAlertVisible(true);
        } else if (timeUntilDue <= 0) {
          setAlertMessage("Task due today");
          setAlertVisible(true);
        } else if (timeUntilDue <= 24 * 60 * 60 * 1000) {
          setAlertMessage("Task due tomorrow");
          setAlertVisible(true);
        } else {
          setAlertVisible(false);
        }
      }
    };

    // Initial update
    updateAlertMessage();

    // Set up interval to update every hour
    const intervalId = setInterval(updateAlertMessage, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [task.dueDate, completed]);

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
    console.log(info);
    await fetchTasks();
  }

  const priorityToExclamation = {
    LOW: "❗",
    MEDIUM: "❗❗",
    HIGH: "❗❗❗",
  };

  // Get the corresponding exclamation points for the task priority
  const exclamationPoints = priorityToExclamation[task.priority] || "";

  const dueDate = new Date(task.dueDate);
  const updatedDueDate = dueDate.toLocaleDateString();

  return (
    <div
      className={`task-container ${alertVisible ? "alert" : ""}`}
      key={task.id}
    >
      {alertVisible && <div className="alert-message">{alertMessage}</div>}
      <p className="category-name">{task.category.name}</p>
      <div className="task-header">
        <div className="task-title">
          <div id="exclamation">{exclamationPoints}</div>
          <div className={completed ? "completed" : ""}>{task.title}</div>
        </div>

        {task.dueDate && <p className="date">{updatedDueDate}</p>}
      </div>
      <p className="description">{task.description}</p>

      <div className="task-footer">
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
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import DeleteTask from "./DeleteTask";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function Tasks({ task, fetchTasks, token }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(task.completed);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const dueDateTime = new Date(task.dueDate);
    const currentTime = new Date();

    const timeUntilDue = dueDateTime - currentTime;
    const daysUntilDue = Math.floor(timeUntilDue / (1000 * 60 * 60 * 24));
    const hoursUntilDue = Math.floor(
      (timeUntilDue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    // const minutesUntilDue = Math.floor(
    //   (timeUntilDue % (1000 * 60 * 60)) / (1000 * 60)
    // );

    const dueDateThresholdDays = 1;
    const dueTimeThresholdHours = 5;

    if (
      (daysUntilDue <= dueDateThresholdDays && daysUntilDue >= 0) ||
      (daysUntilDue === 0 && hoursUntilDue <= dueTimeThresholdHours)
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [task.dueDate]);
  //   // Check if the task is due within the next X days (adjust as needed)
  //   const dueDateThreshold = 1; // Example: Notify 1 day before due date
  //   const today = new Date();
  //   const dueDate = new Date(task.dueDate);

  //   const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

  //   if (daysUntilDue <= dueDateThreshold && daysUntilDue >= 0) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [task.dueDate]);

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

  const dueDate = new Date(task.dueDate);
  const updatedDueDate = dueDate.toLocaleDateString();

  return (
    <div className={`task-container ${showAlert ? "alert" : ""}`} key={task.id}>
      {showAlert && <div className="alert-message">Task due soon!</div>}
      <p>{task.category.name}</p>
      <p>
        {exclamationPoints}
        <span className={completed ? "completed" : ""}>{task.title}</span>
      </p>
      <p className="description">{task.description}</p>
      <p className="date">{updatedDueDate}</p>

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

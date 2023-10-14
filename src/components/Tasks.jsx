import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function Tasks({ task, fetchTasks, token }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(task.completed);

  async function handleCheckboxChange(e) {
    e.preventDefault();
    setCompleted(!completed);

    //Api Put request to update completed

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

  return (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
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
          <Link to={`/editTasks/${task.id}`}>
            <button className="edit-button">
              <FaPencilAlt />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

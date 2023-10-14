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

    <div className="task-container" key={task.id}>
      <p>{task.priority} {task.title}</p>
      <p className="description">{task.description}</p>
      <p className="date">{task.dueDate}</p>

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
          <DeleteTask task={task}/>
          </div>
        )}
      </div>
    </div>
  );
}

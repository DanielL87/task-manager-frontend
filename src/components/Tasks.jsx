import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";

export default function Tasks({ task }) {
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  console.log(completed);

  return (
    <div className="" key={task.id}>
      <h4>{task.title}</h4>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <label>Completed</label>
      </div>
      <p>{task.description}</p>
      <div>
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

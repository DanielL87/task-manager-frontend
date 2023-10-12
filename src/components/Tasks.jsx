import { FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";



export default function Tasks({ task }) {
  const { user } = useOutletContext();

  return (
    <div className="" key={task.id}>
      <h4>{task.title}</h4>
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
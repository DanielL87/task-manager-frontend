import { FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";



export default function Tasks({ task }) {
  const { user } = useOutletContext();

  return (
    <div className="" key={task.id}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className="">
        {user.id === task.userId && (
          <Link to={`/editTasks/${task.id}`}>
            <button>
              <FaPencilAlt />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
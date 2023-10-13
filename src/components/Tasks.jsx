import { FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import DeleteTask from "./DeleteTask";



export default function Tasks({ task }) {
  const { user } = useOutletContext();

  return (
    <div className="" key={task.id}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div>
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
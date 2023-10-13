import { FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import DeleteTask from "./DeleteTask";



export default function Tasks({ task }) {
  const { user } = useOutletContext();

  return (
    <div className="task-container" key={task.id}>
      <p>{task.priority} {task.title}</p>
      <p className="description">{task.description}</p>
      <p className="date">{task.dueDate}</p>
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
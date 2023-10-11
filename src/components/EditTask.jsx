import { useState } from "react";
import { API } from "../api"
import { useOutletContext, useNavigate, useParams } from "react-router-dom";


export default function EditTask() {

    const navigate = useNavigate();
    
    const { token, fetchTasks, tasks } = useOutletContext();
    const { taskId } = useParams();
    
    const task = tasks.find((_task) => _task.id === taskId);
    
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState("");
  
  if(!task){
    return <></>
  }


  async function handleEditTask(e) {
    setError("");
    e.preventDefault();
    const res = await fetch(`${API}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    fetchTasks();
    navigate("/");
  }

  return  (
    <div>
      <form className="task-form" onSubmit={handleEditTask}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <button className="form-control" type="submit"> Update Task</button>
        </div>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}
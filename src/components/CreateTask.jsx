import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function CreateTask() {
  const {token, fetchTasks} = useOutletContext();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const navigate= useNavigate();

  async function handleSubmit(e){
    setError("");
    e.preventDefault();
    
    const res = await fetch(`${API}/tasks`,{
      method:"POST", 
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title, 
        text,
      })
    });
    const info = await res.json();

    if(!info.success) {
      return setError(info.error)
    }
    setText("");
    setTitle("");
    fetchTasks();
    navigate("/");

  }
  return !token ? (
    <h2>Please login to create a task.</h2>
  ) : (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div>
          <input className="" type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="enter task" />
        </div>
        <div className="">
         <textarea style={{resize:'none'}}  className="" onChange={(e) => setText(e.target.value)} value={text} placeholder="Description"/>
        </div>
        <div>
          <button className="">Create Task</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function CreateTask() {
  const {token, fetchTasks, categories, fetchCategories} = useOutletContext();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectCategory, setSelectCategory] = useState("")

  const navigate= useNavigate();

  async function handleSubmit(e){
    setError("");
    e.preventDefault();

    if(!selectCategory){
      setError("Please choose a category");
      return;
    }

    const res = await fetch(`${API}/tasks`,{
      method:"POST", 
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
        body:JSON.stringify({
        title, 
        description,
        categoryId : selectCategory,
      })
    });
    const info = await res.json();

    if(!info.success) {
      return setError(info.error)
    }
    setDescription("");
    setTitle("");
    fetchTasks();
    fetchCategories();
    navigate("/");
  }

  return !token ? (
    <h2>Please login to create a task.</h2>
  ) : (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectCategory"> Select Category</label>
          <select className="form-control" onChange={(e) => setSelectCategory(e.target.value)} value={selectCategory}>
          <option value="">Select a Category</option>
          {categories.map((_category) => (
            <option key={_category.id} value={_category.id}>
              {_category.name}
            </option>
          ))}
          </select>
        </div>
        <div className="form-group">
          <input className="form-control" type="description" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="enter task" />
        </div>
        <div className="form-group">
         <textarea   className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description"/>
        </div>
        <div className="form-group">
          <button className="form-control" onChange={(e) => setSelectCategory(e.target.value)} value={(selectCategory)}>Create Task</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

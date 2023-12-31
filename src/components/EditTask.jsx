import { useState } from "react";
import { API } from "../api";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const navigate = useNavigate();

  const { token, fetchTasks, tasks, categories, fetchCategories } =
    useOutletContext();
  const { taskId } = useParams();

  const task = tasks.find((_task) => _task.id === taskId);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");
  const [selectCategory, setSelectCategory] = useState(task.category.id);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(null);

  if (!task) {
    return <></>;
  }

  async function handleEditTask(e) {
    setError("");
    e.preventDefault();

    let prismaDate = dueDate;
    if (dueDate === "") {
      prismaDate = null;
    } else {
      prismaDate += " EST";
    }

    const res = await fetch(`${API}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        categoryId: selectCategory,
        dueDate: prismaDate,
        priority,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    fetchTasks();
    navigate("/tasks/all");
  }

  return (
    <div className="form-container">
      <form className="task-form" onSubmit={handleEditTask}>
        <div className="form-group">
          <label htmlFor="selectCategory"> Select Category</label>
          <select
            className="form-control"
            onChange={(e) => setSelectCategory(e.target.value)}
            value={selectCategory}
            id="selectCategory"
            name="options"
          >
            <option value="">Select a Category</option>
            {categories.map((_category) => (
              <option key={_category.id} value={_category.id}>
                {_category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="due-Date">Due Date</label>
          <input
            id="due-Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <select
          className="form-group"
          onChange={(e) => setPriority(e.target.value)}
          value={priority || ""}
        >
          <option value="clear">Set a Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <div className="form-group">
          <input
            className="form-control"
            type="description"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Task"
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
        <div className="form-buttons">
          <button className="form-control" type="submit">
            Update Task
          </button>
          <button
            type="button"
            className="form-control"
            onClick={() => navigate("/tasks/all")} // Change "/home" to your home page route
          >
            Cancel
          </button>
        </div>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}

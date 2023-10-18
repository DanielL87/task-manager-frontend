import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function CreateTask() {
  const { token, fetchTasks, categories, fetchCategories } = useOutletContext();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();

    if (!selectCategory) {
      setError("Please choose a category");
      return;
    }

    let prismaDate = dueDate;
    if (dueDate === "") {
      prismaDate = null;
    } else {
      prismaDate += " EST";
    }

    const res = await fetch(`${API}/tasks`, {
      method: "POST",
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
    setDescription("");
    setTitle("");
    fetchTasks();
    fetchCategories();

    const selectedCategory = categories.find(
      (category) => category.id === selectCategory
    );
    if (selectedCategory) {
      const categoryName = selectedCategory.name;
      navigate(`/tasks/${categoryName}`);
    }
  }

  return !token ? (
    <h2>Please login to create a task.</h2>
  ) : (
    <div className="form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectField"> Select Category</label>
          <select
            className="form-control"
            onChange={(e) => setSelectCategory(e.target.value)}
            value={selectCategory}
            id="selectField"
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
          <label>Due Date</label>
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
          <option value="">Set a Priority</option>
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
        <div className="form-group">
          <button
            type="submit"
            className="form-control"
            onChange={(e) => setSelectCategory(e.target.value)}
            value={selectCategory}
          >
            + Add Task
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

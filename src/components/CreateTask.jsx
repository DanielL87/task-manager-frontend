import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function CreateTask() {
  const { token, fetchTasks, categories, fetchCategories } = useOutletContext();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [dueDateDate, setDueDateDate] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [priority, setPriority] = useState(null);

  const navigate = useNavigate();

  let dueDate = null;

  if (dueDateDate && dueDateTime) {
    dueDate = `${dueDateDate}T${dueDateTime}:00Z`;
  } else if (dueDateDate) {
    dueDate = `${dueDateDate} EST`;
  }

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();

    if (!selectCategory) {
      setError("Please choose a category");
      return;
    }

    if (dueDateDate && !validateDueDate(dueDateDate)) {
      setError("Due date must be in the future!");
      return;
    } else {
      setError("");
    }

    console.log(dueDate);

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
        dueDate,
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

  // checks date/time to make sure its in future
  const validateDueDate = (date) => {
    const currentDate = new Date();
    const dueDate = new Date(date);
    return dueDate >= currentDate;
  };

  return !token ? (
    <h2>Please login to create a task.</h2>
  ) : (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectCategory"> Select Category</label>
          <select
            className="form-control"
            onChange={(e) => setSelectCategory(e.target.value)}
            value={selectCategory}
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
            value={dueDateDate}
            onChange={(e) => setDueDateDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Due Time</label>
          <input
            id="dueDateTime"
            type="time"
            value={dueDateTime}
            onChange={(e) => setDueDateTime(e.target.value)}
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

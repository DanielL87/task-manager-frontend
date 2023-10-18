import { Link } from "react-router-dom";
import { API } from "../api";
import { FaTrash } from "react-icons/fa";
export default function Category({
  category,
  token,
  fetchTasks,
  fetchCategories,
}) {
  async function handleDelete(categoryId) {
    const res = await fetch(`${API}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    fetchTasks();
    fetchCategories();
    console.log(info);
  }

  return (
    <div className="category-container">
      <div className="category-header">
        <Link className="link" to={`/tasks/${category.name}`}>
          <div>{category.name}</div>
        </Link>
        <div>{category.tasks.length}</div>
      </div>

      <button
        className="icon-buttons"
        onClick={() => handleDelete(category.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
}

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
    <>
      <Link to={`/tasks/${category.name}`}>
        <div>{category.name}</div>
      </Link>
      <div>{category.tasks.length}</div>
      <button className="edit-button" onClick={() => handleDelete(category.id)}>
        <FaTrash />
      </button>
    </>
  );
}

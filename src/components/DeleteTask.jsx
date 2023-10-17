import { FaTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function DeleteTasks({ task }) {
  const { token, fetchTasks, fetchCategories, user } = useOutletContext();

  async function handleDeleteTask() {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    fetchTasks();
    fetchCategories();
  }

  return (
    user.id === task.userId && (
      <>
        <button className="icon-buttons" onClick={handleDeleteTask}>
          <FaTrashAlt />
        </button>
      </>
    )
  );
}

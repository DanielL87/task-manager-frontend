import { API } from "../api";
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
      <div>{category.name}</div>
      <div>{category.tasks.length}</div>
      <button onClick={() => handleDelete(category.id)}>Delete Category</button>
    </>
  );
}

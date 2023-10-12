import { API } from "../api";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function CreateCategory() {
  const { token, fetchTasks, fetchCategories } = useOutletContext();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${API}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();
    console.log(info);
    navigate("/");
    fetchCategories();
  }

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <h3>Create a New Category</h3>
          <input
            type="text"
            placeholder="Category Name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

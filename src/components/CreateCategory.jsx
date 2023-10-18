import { API } from "../api";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function CreateCategory() {
  const { token, fetchCategories } = useOutletContext();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

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
    if (!info.success) {
      return setError(info.error);
    }

    navigate("/tasks/all");
    fetchCategories();
  }

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <h3>Create Category</h3>
          <input
            type="text"
            placeholder="Category Name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button>Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
}

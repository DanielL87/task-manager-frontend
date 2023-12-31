import { useState } from "react";
import { API } from "../api";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    setToken(info.token);
    localStorage.setItem("token", info.token);

    navigate("/tasks/all");
  }

  return (
    <div id="">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username.."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
        />
        <button type="submit">Register</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
}

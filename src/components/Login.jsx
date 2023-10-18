import { useState } from "react";
import { API } from "../api";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
}

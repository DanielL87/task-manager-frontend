import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./api";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchUser() {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
    }

    if (!token) {
      return;
    }

    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    if (info.success) {
      setUser(info.user);
    }
  }

  // fetch tasks

  async function fetchTasks() {
    const res = await fetch(`${API}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const info = await res.json();

    console.log(info)

    if (info.success) {
      setTasks(info.tasks);
    }
  }

  // fetch categories

  async function fetchCategories() {
    const res = await fetch(`${API}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const info = await res.json();

    if (info.success) {
      setCategories(info.categories);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchTasks();
    fetchUser();
  }, [token]);

  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{
          setToken,
          token,
          user,
          categories,
          setCategories,
          tasks,
          setTasks,
          fetchTasks,
          fetchCategories,
        }}
      />
    </div>
  );
}

export default App;

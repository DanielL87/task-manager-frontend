import { Link } from "react-router-dom";
import logo from "../assets/logo2.svg"

export default function Navbar({
  user,
  setToken,
  setUser,
  setTasks,
  setCategories,
}) {
  function handleLogout() {
    setToken("");
    setUser({});
    setTasks([]);
    setCategories([]);
    localStorage.removeItem("token");
  }

  return (
    <div className="navbar-container">
      <img src={logo} alt="logo" />
      <Link className="link" to={"/"}>
        Home
      </Link>
      {!user.id && (
        <>
          <Link className="link" to={"/login"}>
            Login
          </Link>
          <Link className="link" to={"/register"}>
            Register
          </Link>
        </>
      )}
      {user.id && (
        <>
          <span className="link">Welcome {user.username}</span>
          <Link className="link" to={"/"} onClick={handleLogout}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Navbar({user, setToken, setUser}){
    function handleLogout(){
        setToken("");
        setUser({});
        localStorage.removeItem("token");
    }
    
    return(
        <div className="navbar-container">
            <Link className="link" to={"/"}>
            Home
            </Link>
            {!user.id && ( 
                <>
<Link className="link" to={"/login"}>Login</Link>
<Link className="link" to={"/register"}>Register</Link>
                </>
            )}
            {user.id &&(
                <>    
                <span className="link">Welcome{user.username}</span>
                <Link className="link" to={"/"} onClick={handleLogout}>Logout</Link>
                </>
            )}
        </div>
    )
}
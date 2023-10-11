import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import CreateCategory from "./components/createCategory.jsx";
import CreateTask from "./components/CreateTask.jsx";
import EditTask from "./components/EditTask.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "createcategory", element: <CreateCategory /> },
      {path:"createTask", element:<CreateTask/>},
      {path: "editTasks/:taskId", element:<EditTask/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

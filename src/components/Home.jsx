import { Link, useOutletContext, useParams } from "react-router-dom";
import Category from "./Category";
import Tasks from "./Tasks";
import LandingPage from "./LandingPage";
import { useEffect, useState } from "react";

export default function Home() {
  const { categories, tasks, token, fetchTasks, fetchCategories, user } =
    useOutletContext();
  const { categoryName } = useParams();

  const [filterByCompleted, setFilterByCompleted] = useState(false);
  const [filterByPriority, setFilterByPriority] = useState("");

  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    let selectedTasks = tasks.filter(
      (task) => task.category.name === categoryName || categoryName === "all"
    );
    if (filterByCompleted) {
      selectedTasks = selectedTasks.filter((task) => task.completed);
    }
    setSelectedTasks(selectedTasks);
  }, [filterByCompleted, tasks, categoryName]);

  return (
    <>
      {user.id ? (
        <div id="body-container">
          <div>
            <div id="sorting-container">
              <div className="sorting-segment">
                <label className="completed-label">
                  <input
                    type="checkbox"
                    checked={filterByCompleted}
                    onChange={() => setFilterByCompleted(!filterByCompleted)}
                  />
                  Sort by Completed Tasks
                </label>
                <select name="" id="">
                  <option value="">Sort by Priority</option>
                  <option value="">Low</option>
                  <option value="">Medium</option>
                  <option value="">High</option>
                </select>
              </div>
            </div>

            {categories.map((category) => {
              return (
                <Category
                  key={category.id}
                  category={category}
                  token={token}
                  fetchCategories={fetchCategories}
                  fetchTasks={fetchTasks}
                />
              );
            })}
            <div className="add-category">
              <Link to={"/createcategory"}>
                <button> + Add Category</button>
              </Link>
            </div>
          </div>

          <div id="task-container">
            {selectedTasks.map((task) => {
              return (
                <div className="task" key={task.id}>
                  <Tasks task={task} fetchTasks={fetchTasks} token={token} />
                </div>
              );
            })}

            <div>
              {categoryName && (
                <Link to={"/createTask"}>
                  <button>+ New Task</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
}

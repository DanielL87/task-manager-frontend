import { Link, useOutletContext, useParams } from "react-router-dom";
import Category from "./Category";
import Tasks from "./Tasks";

export default function Home() {
  const { categories, tasks, token, fetchTasks, fetchCategories, user } =
    useOutletContext();
  const { categoryName } = useParams();

  const selectedTasks = tasks.filter(
    (task) => task.category.name === categoryName
  );

  return (
    <>
      {user.id ? (
        <div id="body-container">
          <div>
            <Link to={"/createcategory"}>
              <button>Create Category!</button>
            </Link>
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
        <div>Please Login</div>
      )}
    </>
  );
}

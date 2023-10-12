import { Link, useOutletContext, useParams } from "react-router-dom";
import Category from "./Category";
import Tasks from "./Tasks";

export default function Home() {
  const { categories, tasks, token, fetchTasks, fetchCategories } =
    useOutletContext();
  const { categoryName } = useParams();

  const selectedTasks = tasks.filter(
    (task) => task.category.name === categoryName
  );

  return (
    <>
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
        <div>
          <div>
            {" "}
            <div>
              {selectedTasks.map((task) => {
                return (
                  <div className="task" key={task.id}>
                    <Tasks task={task} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {categoryName && (
              <Link to={"/createTask"}>
                <button>+ New Task</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { Link, useOutletContext } from "react-router-dom";
import Category from "./Category";
import Tasks from "./Tasks";

export default function Home() {
  const { categories, tasks, token, fetchTasks, fetchCategories } =
    useOutletContext();

  return (
    <>
      <div>
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

          <div >
            {tasks.map((task) => {
              return (
                <div className="task" key={task.id} >
                  <Tasks task={task} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Link to={"/createTask"}>
            <button>+ New Task</button>
          </Link>
        </div>
      </div>
    </>
  );
}

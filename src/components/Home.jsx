import { Link, useOutletContext } from "react-router-dom";
import Category from "./Category";
import Tasks from "./Tasks";

export default function Home() {
  const { categories, tasks } = useOutletContext();

  return (
    <>
      <div>
        <div>
          <Link to={"/createcategory"}>
            <button>Create Category!</button>
          </Link>
          {categories.map((category) => {
            return <Category key={category.id} category={category} />;
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

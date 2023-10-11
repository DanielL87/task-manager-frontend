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
          <div>
            <Link to={"/createTask"}>
              <button>Create Task</button>
            </Link>
          </div>
          <div className="">
          {tasks.map((task) => {
            return <div key={task.id} className="task">
            <Tasks task ={task} />
            </div>
          })
          }
          </div>
        </div>
      </div>
    </>
  );
}

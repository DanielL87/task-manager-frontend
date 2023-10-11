import { Link, useOutletContext } from "react-router-dom";
import Category from "./Category";

export default function Home() {
  const { categories, fetchCategories, tasks } = useOutletContext();

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
          {tasks.map((task) => (
            <div className="" key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

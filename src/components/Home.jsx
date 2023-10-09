import { Link, useOutletContext } from "react-router-dom";
import Category from "./Category";

export default function Home() {
  const { categories, fetchCategories } = useOutletContext();
  console.log(categories);

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
      </div>
    </>
  );
}

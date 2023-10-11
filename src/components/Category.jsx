export default function Category({ category, user }) {
  return (
    <>
      <h1>{category.name}</h1>
      <h1>{category.tasks.length}</h1>
    </>
  );
}

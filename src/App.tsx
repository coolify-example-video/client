import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Course = {
  id: number;
  name: string;
};
function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = () => {
    return fetch(`${baseUrl}/course`)
      .then((res) => res.json() as Promise<Course[]>)
      .then(setCourses);
  };

  const [name, setName] = useState("");

  const handleAdd = async () => {
    await fetch(`${baseUrl}/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => res.json() as Promise<Course[]>);

    await fetchCourses();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${baseUrl}/course/${id}`, {
      method: "DELETE",
    });

    await fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Update title </h1>
      <button onClick={handleAdd}>add course</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div className="card">
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <div>course name:{course.name}</div>
              <button onClick={() => handleDelete(course.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

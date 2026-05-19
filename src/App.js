import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks]       = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
    
    
  });
  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const [error, setError]       = useState("")
  const [filter, setFilter]     = useState("all");

  const filteredTasks = () =>{
    if (filter === "all")   return tasks;
    if (filter === "active")      return tasks.filter(task => !task.completed);
    if (filter === "completed")   return tasks.filter(task => task.completed);
    return tasks;
  }

  const deleteTask = (indexToDelete) => {
  setTasks(tasks.filter((task,i) => i !== indexToDelete));
  };

  const addTask = ()=> {
    if(!taskName){
      setError("Please enter a task name 🤨⚠️");
    }
    else{
    setTasks([...tasks, {name: taskName , completed: false, id : Date.now() ,createdOn: Date.now()}]);
    setTaskName("")
    setError("");
    }
  };

    const remTask = ()=> {
    setTasks([]);
    setTaskName("");
    };

    const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task));
    }

return (
    <div>
      {/* Animated bubbles background */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Main app content */}
      <div className="app-container">

        <h1 className="app-title">Task Manager ✅</h1>

        <input
          className="task-input"
          type="text"
          placeholder="State your task to be added..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <button className="btn btn-add" onClick={addTask}>Add task 😃</button>
        <button className="btn btn-clear" onClick={remTask}>Clear Tasks 🫡</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <button className="btn btn-filter" onClick={() => setFilter("all")}>All 📋</button>
          <button className="btn btn-filter btn-active" onClick={() => setFilter("active")}>Active 🔵</button>
          <button className="btn btn-filter btn-complete" onClick={() => setFilter("completed")}>Completed 🟢</button>
        </div>

        <ul style={{ paddingLeft: 0 }}>
          {filteredTasks().map((task) => (
            <li key={task.id} style={{ listStyle: "none" }}>
              <div className="task-card">
                <span style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "#5a3e1b",
                  flex: 1,
                  fontSize: "16px",
                }}>
                  ⭐ {task.name}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    style={{ fontSize: "12px", color: "green", whiteSpace: "nowrap", cursor: "pointer" }}>
                    {task.completed ? "Undo ↩️" : "Complete 😁"}
                  </button>
                  <button
                    onClick={() => deleteTask(tasks.indexOf(task))}
                    style={{ fontSize: "12px", color: "red", whiteSpace: "nowrap", cursor: "pointer" }}>
                    Delete ❌
                  </button>
                  <button
                    onClick={() => alert(`Task created on: ${new Date(task.createdOn).toLocaleString()}`)}
                    style={{ fontSize: "12px", color: "blue", whiteSpace: "nowrap", cursor: "pointer" }}>
                    Created On ℹ️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
export default App; 
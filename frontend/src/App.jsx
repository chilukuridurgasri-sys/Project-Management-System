import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = ["To Do", "In Progress", "Testing", "Done"];

  const colorMap = {
    "To Do": "bg-pink-100 border-pink-400",
    "In Progress": "bg-yellow-100 border-yellow-400",
    "Testing": "bg-cyan-100 border-cyan-400",
    "Done": "bg-emerald-100 border-emerald-400",
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        status,
        priority,
        userId: "69724da5470f943e59c554ec",
      }),
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("Medium");
  };

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const updated = await res.json();

    setTasks(
      tasks.map((task) =>
        task._id === id ? updated : task
      )
    );
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleDrop = async (status) => {
    if (!draggedTask) return;

    await updateStatus(draggedTask._id, status);
    setDraggedTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-8">
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-8">
        PROJECT MANAGEMENT SYSTEM
      </h1>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 rounded-lg border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Task */}
      <div className="bg-white p-5 rounded-xl shadow-lg flex gap-3 max-w-4xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Enter task..."
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {columns.map((col) => (
            <option key={col}>{col}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-5 rounded"
        >
          Add
        </button>
      </div>

      {/* Board */}
      <div className="grid md:grid-cols-4 gap-5">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col)}
            className={`rounded-xl border-2 p-4 ${colorMap[col]}`}
          >
            <h2 className="text-xl font-bold text-center mb-4">
              {col}
              <span className="ml-2 bg-white px-2 rounded-full">
                {
                  filteredTasks.filter(
                    (task) => task.status === col
                  ).length
                }
              </span>
            </h2>

            {filteredTasks
              .filter((task) => task.status === col)
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={() =>
                    setDraggedTask(task)
                  }
                  className="bg-white p-4 rounded-lg shadow mb-3 cursor-move"
                >
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Priority: {task.priority || "Medium"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      task.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
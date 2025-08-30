'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../../components/taskForm";
import TaskList from "../../components/taskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/api/tasks", {
        params: { keyword, status }
      });
      setTasks(res.data);
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [keyword, status]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm refreshTasks={fetchTasks} />
      
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <select className="border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading tasks...</div>
      ) : error ? (
        <div className="text-red-500 py-4">{error}</div>
      ) : (
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import TaskForm from "../../components/taskForm";
import TaskList from "../../components/taskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="container py-4">
      <h1 className="display-6 mb-4">Task Manager</h1>
      
      {/* Task Form Modal */}
      <TaskForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        refreshTasks={fetchTasks} 
      />
      
      <div className="row g-3 mb-4">
        <div className="col">
          <input 
            className="form-control" 
            placeholder="Search..." 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
          />
        </div>
        <div className="col-auto">
          <select 
            className="form-select" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Tasks List */}
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
          
          {/* Add Task Card Button */}
          <div className="col">
            <button
              onClick={() => setIsModalOpen(true)}
              className="card h-100 border-0 bg-light d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#F3F0FF',
                cursor: 'pointer',
                minHeight: '200px'
              }}
            >
              <div className="card-body d-flex flex-column align-items-center justify-content-center border border-2">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
                  <path d="M12 4V20M4 12H20" stroke="#6F42C1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h5 className="card-title text-purple" style={{ color: '#6F42C1', minWidth: '100px'}}></h5>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

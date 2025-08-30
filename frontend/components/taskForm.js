import { useState } from "react";
import axios from "axios";

export default function TaskForm({ isOpen, onClose, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tasks", { title, description, status });
    setTitle("");
    setDescription("");
    setStatus("pending");
    refreshTasks();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title" style={{ color: '#6f42c1' }}>Add Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  className="form-control" 
                  placeholder="Title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                />
              </div>
              <div className="mb-3">
                <textarea 
                  className="form-control" 
                  placeholder="Enter Description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <select 
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary flex-grow-1"
                  style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
                >
                  Confirm
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="btn btn-light flex-grow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

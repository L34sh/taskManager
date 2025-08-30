import axios from "axios";
import { useState } from "react";

export default function TaskList({ tasks, refreshTasks }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const updateTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;
    
    await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, {
      title: editTitle,
      description: editDescription,
      status: editStatus
    });
    setEditingTask(null);
    refreshTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    refreshTasks();
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id} className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title mb-0">{task.title}</h5>
                <div className="d-flex gap-2">
                  <button 
                    onClick={() => openEditModal(task)} 
                    className="btn btn-link p-0 text-secondary"
                    title="Edit Task"
                    style={{ color: '#6f42c1' }}
                  >
                    <i className="bi bi-pencil-square fs-5"></i>
                  </button>
                  <button 
                    onClick={() => deleteTask(task._id)} 
                    className="btn btn-link p-0 text-secondary"
                    title="Delete Task"
                    style={{ color: '#6f42c1' }}
                  >
                    <i className="bi bi-trash3 fs-5"></i>
                  </button>
                </div>
              </div>
              <p className="card-text text-secondary mb-3">{task.description}</p>
              <div className="d-flex justify-content-start">
                <span className={`badge rounded-pill ${
                  task.status === 'completed' ? 'text-bg-success' : 
                  task.status === 'in-progress' ? 'text-bg-warning' : 'text-bg-danger'
                }`}>
                  {task.status}
                </span>
              </div>
              </div>
            </div>
          </div>
      ))}
      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title" style={{ color: '#6f42c1' }}>Add Task</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setEditingTask(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateTask}>
                  <div className="mb-3">
                    <input 
                      className="form-control" 
                      placeholder="Title" 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea 
                      className="form-control" 
                      placeholder="Enter Description" 
                      value={editDescription} 
                      onChange={(e) => setEditDescription(e.target.value)}
                      required
                      rows="4"
                    />
                  </div>
                  <div className="mb-4">
                    <select 
                      className="form-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
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
                      onClick={() => setEditingTask(null)}
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
      )}
    </>
  );
}

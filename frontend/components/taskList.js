import axios from "axios";

export default function TaskList({ tasks, refreshTasks }) {
  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
    refreshTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    refreshTasks();
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="p-3 border rounded mb-2 flex justify-between">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <span className="text-sm text-gray-500">Status: {task.status}</span>
          </div>
          <div>
            <select value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)} className="border p-1 mr-2">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

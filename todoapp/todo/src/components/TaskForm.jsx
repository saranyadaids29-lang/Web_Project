import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm({
  editTask = null,
  selectedDate = "",
  onCancelEdit,
}) {
  const { addTask, updateTask } = useContext(TaskContext);

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate || getToday(),
    time: "",
    priority: "Medium",
    category: "Personal",
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        date: editTask.date,
        time: editTask.time,
        priority: editTask.priority,
        category: editTask.category,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: selectedDate || getToday(),
        time: "",
        priority: "Medium",
        category: "Personal",
      });
    }
  }, [editTask, selectedDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!formData.date) {
      alert("Please select a date.");
      return;
    }

    if (editTask) {
      updateTask(editTask.id, formData);
      onCancelEdit();
    } else {
      addTask(formData);

      setFormData({
        title: "",
        description: "",
        date: selectedDate || getToday(),
        time: "",
        priority: "Medium",
        category: "Personal",
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <div className="form-header">
        <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>

        {editTask && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Task Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Time</label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Personal">Personal</option>
            <option value="College">College</option>
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

      </div>

      <button type="submit" className="primary-button">
        {editTask ? "Update Task" : "Add Task"}
      </button>

    </form>
  );
}

export default TaskForm;
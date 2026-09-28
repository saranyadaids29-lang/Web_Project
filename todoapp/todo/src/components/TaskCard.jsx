import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task, onEdit }) {
  const { deleteTask, toggleTask } =
    useContext(TaskContext);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      className={`task-card ${
        task.completed ? "completed-task" : ""
      }`}
    >

      <div className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
      </div>

      <div className="task-content">

        <div className="task-title-row">
          <h3>{task.title}</h3>

          <span
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-details">

          <span>
            📅 {task.date}
          </span>

          {task.time && (
            <span>
              ⏰ {task.time}
            </span>
          )}

          <span>
            📁 {task.category}
          </span>

        </div>

      </div>

      <div className="task-actions">

        <button
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;
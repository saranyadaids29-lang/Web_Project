import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onEdit,
  emptyMessage = "No tasks found.",
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>

        <h3>No Tasks</h3>

        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
        />
      ))}

    </div>
  );
}

export default TaskList;
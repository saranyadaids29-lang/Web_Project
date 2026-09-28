import { useContext, useState } from "react";

import { TaskContext } from "../context/TaskContext";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Daily() {
  const { tasks } = useContext(TaskContext);

  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const today =
    new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const cancelForm = () => {
    setEditTask(null);
    setShowForm(false);
  };

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <p className="section-label">
            DAILY PLANNER
          </p>

          <h1>Today's Tasks</h1>

          <p>
            Manage everything you need to complete
            today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditTask(null);
            setShowForm(true);
          }}
        >
          + Add Task
        </button>

      </div>

      {showForm && (
        <TaskForm
          editTask={editTask}
          selectedDate={today}
          onCancelEdit={cancelForm}
        />
      )}

      <div className="task-summary">

        <div>
          <strong>
            {todayTasks.length}
          </strong>
          <span>Total</span>
        </div>

        <div>
          <strong>
            {
              todayTasks.filter(
                (task) => task.completed
              ).length
            }
          </strong>
          <span>Completed</span>
        </div>

        <div>
          <strong>
            {
              todayTasks.filter(
                (task) => !task.completed
              ).length
            }
          </strong>
          <span>Pending</span>
        </div>

      </div>

      <section className="section">

        <TaskList
          tasks={todayTasks}
          onEdit={handleEdit}
          emptyMessage="Your day is clear. Add a new task to get started."
        />

      </section>

    </div>
  );
}

export default Daily;
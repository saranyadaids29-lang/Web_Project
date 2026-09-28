import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { TaskContext } from "../context/TaskContextValue";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const { tasks } = useContext(TaskContext);

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const today =
    new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setShowForm(false);
  };

  return (
    <div className="page">

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            PERSONAL TASK MANAGER
          </p>

          <h1>
            Organize your day.
            <br />
            Accomplish your goals.
          </h1>

          <p>
            Manage your daily tasks, weekly plans,
            important dates and priorities in one
            simple application.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => {
                setEditTask(null);
                setShowForm(true);
              }}
            >
              + Add New Task
            </button>

            <Link
              to="/dashboard"
              className="secondary-button"
            >
              View Dashboard
            </Link>

          </div>

        </div>

        <div className="hero-stat">

          <span>Today's Tasks</span>

          <strong>
            {todayTasks.length}
          </strong>

          <small>
            {todayTasks.filter(
              (task) => task.completed
            ).length}{" "}
            completed
          </small>

        </div>

      </section>

      {showForm && (
        <TaskForm
          editTask={editTask}
          onCancelEdit={handleCancelEdit}
        />
      )}

      <section className="section">

        <div className="section-header">

          <div>
            <p className="section-label">
              TODAY
            </p>

            <h2>
              Today's Tasks
            </h2>
          </div>

          <Link to="/daily">
            View All →
          </Link>

        </div>

        <TaskList
          tasks={todayTasks}
          onEdit={handleEdit}
          emptyMessage="You don't have any tasks scheduled for today."
        />

      </section>

    </div>
  );
}

export default Home;
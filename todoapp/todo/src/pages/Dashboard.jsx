import { useContext, useState } from "react";

import { TaskContext } from "../context/TaskContextValue";

import DashboardCard from "../components/DashboardCard";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const { tasks } = useContext(TaskContext);

  const [editTask, setEditTask] = useState(null);

  const today =
    new Date().toISOString().split("T")[0];

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const importantTasks = tasks.filter(
    (task) =>
      task.priority === "High" &&
      !task.completed
  ).length;

  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  const handleEdit = (task) => {
    setEditTask(task);
  };

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <p className="section-label">
            OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p>
            Here's an overview of your tasks.
          </p>
        </div>

      </div>

      <div className="dashboard-grid">

        <DashboardCard
          title="Total Tasks"
          value={totalTasks}
          icon="📋"
          description="All your tasks"
        />

        <DashboardCard
          title="Completed"
          value={completedTasks}
          icon="✅"
          description="Tasks completed"
        />

        <DashboardCard
          title="Pending"
          value={pendingTasks}
          icon="⏳"
          description="Tasks remaining"
        />

        <DashboardCard
          title="Important"
          value={importantTasks}
          icon="⭐"
          description="High priority"
        />

      </div>

      {editTask && (
        <TaskForm
          editTask={editTask}
          onCancelEdit={() =>
            setEditTask(null)
          }
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

        </div>

        <TaskList
          tasks={todayTasks}
          onEdit={handleEdit}
          emptyMessage="No tasks scheduled for today."
        />

      </section>

      <section className="section">

        <div className="section-header">

          <div>
            <p className="section-label">
              IMPORTANT
            </p>

            <h2>
              High Priority Tasks
            </h2>
          </div>

        </div>

        <TaskList
          tasks={tasks.filter(
            (task) =>
              task.priority === "High" &&
              !task.completed
          )}
          onEdit={handleEdit}
          emptyMessage="No high priority pending tasks."
        />

      </section>

    </div>
  );
}

export default Dashboard;
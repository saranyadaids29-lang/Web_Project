import { useContext, useState } from "react";

import { TaskContext } from "../context/TaskContext";

import Calendar from "../components/Calendar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function ImportantDays() {
  const { tasks } = useContext(TaskContext);

  const today =
    new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [editTask, setEditTask] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const selectedTasks = tasks.filter(
    (task) => task.date === selectedDate
  );

  const importantDates = tasks.filter(
    (task) =>
      task.priority === "High"
  );

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const cancelForm = () => {
    setEditTask(null);
    setShowForm(false);
  };

  const formatSelectedDate = () => {
    const date = new Date(
      `${selectedDate}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <p className="section-label">
            IMPORTANT DAYS
          </p>

          <h1>Calendar</h1>

          <p>
            Select any date to view its tasks.
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
          selectedDate={selectedDate}
          onCancelEdit={cancelForm}
        />
      )}

      <div className="calendar-layout">

        <Calendar
          tasks={tasks}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <div className="selected-date-panel">

          <div className="selected-date-header">

            <div>
              <p className="section-label">
                SELECTED DATE
              </p>

              <h2>
                {formatSelectedDate()}
              </h2>
            </div>

            <span className="date-count">
              {selectedTasks.length}
            </span>

          </div>

          <TaskList
            tasks={selectedTasks}
            onEdit={handleEdit}
            emptyMessage="There are no tasks for this date."
          />

        </div>

      </div>

      <section className="section">

        <div className="section-header">

          <div>
            <p className="section-label">
              HIGH PRIORITY
            </p>

            <h2>
              Important Tasks
            </h2>
          </div>

          <span>
            {importantDates.length} tasks
          </span>

        </div>

        <TaskList
          tasks={importantDates}
          onEdit={handleEdit}
          emptyMessage="No important tasks."
        />

      </section>

    </div>
  );
}

export default ImportantDays;
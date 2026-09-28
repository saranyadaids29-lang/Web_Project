import { useContext, useState } from "react";

import { TaskContext } from "../context/TaskContext";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Weekly() {
  const { tasks } = useContext(TaskContext);

  const [editTask, setEditTask] = useState(null);

  const today = new Date();

  const startOfWeek = new Date(today);

  const day = today.getDay();

  startOfWeek.setDate(
    today.getDate() - day
  );

  const getDateString = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);

    date.setDate(
      startOfWeek.getDate() + i
    );

    weekDays.push(date);
  }

  const handleEdit = (task) => {
    setEditTask(task);
  };

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <p className="section-label">
            WEEKLY PLANNER
          </p>

          <h1>This Week</h1>

          <p>
            Plan and track your tasks for the
            entire week.
          </p>
        </div>

      </div>

      {editTask && (
        <TaskForm
          editTask={editTask}
          onCancelEdit={() =>
            setEditTask(null)
          }
        />
      )}

      <div className="weekly-container">

        {weekDays.map((date) => {

          const dateString =
            getDateString(date);

          const dayTasks = tasks.filter(
            (task) =>
              task.date === dateString
          );

          const isToday =
            dateString ===
            getDateString(today);

          return (
            <div
              className={`weekly-day ${
                isToday
                  ? "current-day"
                  : ""
              }`}
              key={dateString}
            >

              <div className="weekly-day-header">

                <div>
                  <span>
                    {date.toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                      }
                    )}
                  </span>

                  <strong>
                    {date.getDate()}
                  </strong>
                </div>

                <small>
                  {dayTasks.length} tasks
                </small>

              </div>

              <TaskList
                tasks={dayTasks}
                onEdit={handleEdit}
                emptyMessage="No tasks"
              />

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Weekly;
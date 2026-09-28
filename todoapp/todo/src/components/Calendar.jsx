import { useState } from "react";

function Calendar({
  tasks,
  selectedDate,
  onDateSelect,
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentMonth.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const previousMonth = () => {
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    const todayString =
      today.toISOString().split("T")[0];

    onDateSelect(todayString);
  };

  const getDateString = (day) => {
    const monthString = String(month + 1).padStart(
      2,
      "0"
    );

    const dayString = String(day).padStart(
      2,
      "0"
    );

    return `${year}-${monthString}-${dayString}`;
  };

  const getTasksForDate = (date) => {
    return tasks.filter(
      (task) => task.date === date
    );
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="calendar">

      <div className="calendar-header">

        <button
          className="calendar-nav"
          onClick={previousMonth}
        >
          ‹
        </button>

        <div>
          <h2>
            {monthName} {year}
          </h2>

          <button
            className="today-button"
            onClick={goToToday}
          >
            Today
          </button>
        </div>

        <button
          className="calendar-nav"
          onClick={nextMonth}
        >
          ›
        </button>

      </div>

      <div className="calendar-weekdays">

        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div key={day}>
            {day}
          </div>
        ))}

      </div>

      <div className="calendar-grid">

        {calendarDays.map((day, index) => {

          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="calendar-day empty"
              />
            );
          }

          const date = getDateString(day);

          const dateTasks =
            getTasksForDate(date);

          const isSelected =
            date === selectedDate;

          const todayString =
            today.toISOString().split("T")[0];

          const isToday =
            date === todayString;

          const hasHighPriority =
            dateTasks.some(
              (task) =>
                task.priority === "High"
            );

          return (
            <button
              key={date}
              className={`calendar-day ${
                isSelected
                  ? "selected"
                  : ""
              } ${
                isToday
                  ? "today"
                  : ""
              }`}
              onClick={() =>
                onDateSelect(date)
              }
            >

              <span className="day-number">
                {day}
              </span>

              {dateTasks.length > 0 && (
                <div className="calendar-task-info">

                  <span className="task-dot">
                    {hasHighPriority
                      ? "★"
                      : "•"}
                  </span>

                  <span>
                    {dateTasks.length}
                  </span>

                </div>
              )}

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Calendar;
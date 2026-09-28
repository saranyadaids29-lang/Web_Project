import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
      priority: task.priority,
      category: task.category,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // Edit Task
  const updateTask = (id, updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
  };

  // Complete / Uncomplete Task
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => !task.completed)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        toggleTask,
        clearCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
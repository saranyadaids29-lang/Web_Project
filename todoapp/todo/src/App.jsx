import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { TaskProvider } from "./context/TaskContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import ImportantDays from "./pages/ImportantDays";

function App() {
  return (
    <TaskProvider>
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/important-days" element={<ImportantDays />} />
        </Routes>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;
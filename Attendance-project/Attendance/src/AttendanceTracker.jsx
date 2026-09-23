import { useState } from "react";
import "./AttendanceTracker.css";

function AttendanceTracker() {
  const [students, setStudents] = useState([
    { id: 1, name: "Saranya", status: "Absent" },
    { id: 2, name: "Sakthiya", status: "Absent" },
    { id: 3, name: "Deepika", status: "Absent" },
    { id: 4, name: "Raji", status: "Absent" },
    { id: 5, name: "Padma", status: "Absent" },
    { id: 6, name: "Nivedha", status: "Absent" },
    { id: 7, name: "Manju", status: "Absent" },
    { id: 8, name: "Pradeepa", status: "Absent" },
    { id: 9, name: "Pooja", status: "Absent" },
    { id: 10, name: "Divya", status: "Absent" },
    { id: 11, name: "Tharun", status: "Absent" },
    { id: 12, name: "Santha", status: "Absent" },
    { id: 13, name: "Anu", status: "Absent" },
    { id: 14, name: "Arjun", status: "Absent" },
    { id: 15, name: "Charan", status: "Absent" },
    { id: 16, name: "Lakshit", status: "Absent" },
    { id: 17, name: "Sasi", status: "Absent" },
    { id: 18, name: "Babu", status: "Absent" },
    { id: 19, name: "Hema", status: "Absent" },
    { id: 20, name: "Roja", status: "Absent" }
  ]);

  const markAttendance = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: status }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="attendance-container">

      <h1>Student Attendance Tracker</h1>

      <div className="summary">
        <div>
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div>
          <h3>Present</h3>
          <p className="present-count">{presentCount}</p>
        </div>

        <div>
          <h3>Absent</h3>
          <p className="absent-count">{absentCount}</p>
        </div>
      </div>

      <div className="student-list">

        {students.map((student) => (
          <div className="student" key={student.id}>

            <span className="student-name">
              {student.id}. {student.name}
            </span>

            <div className="buttons">

              <button
                className="present-btn"
                onClick={() =>
                  markAttendance(student.id, "Present")
                }
              >
                Present
              </button>

              <button
                className="absent-btn"
                onClick={() =>
                  markAttendance(student.id, "Absent")
                }
              >
                Absent
              </button>

            </div>

            <span
              className={
                student.status === "Present"
                  ? "status present"
                  : "status absent"
              }
            >
              {student.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AttendanceTracker;
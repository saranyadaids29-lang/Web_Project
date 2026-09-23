import { useState } from "react";

const projects = [
  {
    name: "Students Details",

    description:
      "This project is a simple Student Details Management System developed in Java using fundamental Object-Oriented Programming (OOP) concepts. It allows users to input and display multiple student records through a console-based interface.",

    technology: "Java OOPs Core",

    github:
      "https://github.com/saranyadaids29-lang/Students-Details-using-Oops-java-"
  },

  {
    name: "Bank Management System",

    description:
      "This project is a Bank Management System built in Java using core Object-Oriented Programming (OOP) principles. It simulates basic banking operations such as account creation, deposits, withdrawals, and balance inquiries. The system is designed with a focus on clean architecture, modularity, and scalability using OOP concepts.",

    technology: "Java OOPs Core",

    github:
      "https://github.com/saranyadaids29-lang/Bank-Management-System-in-java-using-oops"
  },

  {
    name: "ATM Management System",

    description:
      "This project is a simple ATM Management System implemented in Java using core Object-Oriented Programming (OOP) principles. It simulates basic ATM operations such as balance checking, deposit, and withdrawal. The design focuses on Encapsulation, Abstraction, Inheritance, and Polymorphism to ensure clean and maintainable code.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/ATM-Management-System-in-java-using-oops"
  },

  {
    name: "Vehicle Hierarchy",

    description:
      "This project demonstrates a Vehicle Hierarchy system using core Object-Oriented Programming (OOP) concepts such as Inheritance, Polymorphism, and Abstraction. The goal is to model different types of vehicles while promoting code reuse, scalability, and clean design.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/-Vehicle-Hierarchy-using-Oops-java-"
  },

  {
    name: "Library Book List using Encapsulation and Composition",

    description:
      "This project demonstrates how to build a simple Library Book List system using the principles of Encapsulation and Composition in object-oriented programming. The application models a real-world library where books are managed through a structured and maintainable design.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/Library-Book-List-using-Encapsulation-and-composition-using-Oops-java-"
  },

  {
    name: "Build a small GUI app using Multithreading with SOLID Principles",

    description:
      "This project is a lightweight GUI application built to demonstrate the practical use of multithreading alongside SOLID design principles. The application focuses on maintaining responsiveness in the user interface while executing background tasks efficiently and safely.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/Build-a-small-GUI-app-with-Multithreading-SOLID-using-Oops-java-"
  },

  {
    name: "Inventory System using Hash Map for Stock",

    description:
      "This project is a simple and efficient Inventory Management System built using a HashMap data structure to handle stock operations. It allows users to add, update, delete, and track items in real-time with optimized performance.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/Inventory-System-HashMap-for-Stock-using-oops-java-"
  },

  {
    name: "Banking System using Exception, Collections and Generics",

    description:
      "This project is a simple yet robust Banking System application developed in Java that demonstrates core object-oriented programming concepts along with advanced features like Exception Handling, Collections Framework, and Generics.",

    technology: "Java OOPs core",

    github:
      "https://github.com/saranyadaids29-lang/Banking-system-using-exceptions-collection-generics"
  },

  {
    name: "College Development Website",

    description:
      "A college development website project created to demonstrate front-end and back-end web development skills, featuring pages for academics, admissions, events, and campus life.",

    technology: "Web Tech HTML5",

    github:
      "https://github.com/saranyadaids29-lang/College-Development-Website"
  },

  {
    name: "College Development Website with CSS",

    description:
      "College Department Website is a responsive and modern web platform. It provides details about faculty, courses, and academic resources. The site includes announcements, events, and contact information. Designed with user-friendly navigation and clean layout.",

    technology: "Web Tech HTML5",

    github:
      "https://github.com/saranyadaids29-lang/College-Department-Website-using-html-and-css"
  },

  {
    name: "Theme Switcher",

    description:
      "A Theme Switcher allows users to change the appearance of a website or application. It helps switch between different themes like light mode and dark mode. HTML is used to create the structure, CSS defines the styles, and JavaScript changes the theme.",

    technology: "Web Tech CSS3",

    github:
      "https://github.com/saranyadaids29-lang/Theme-Switcher-using-html-css-js-"
  },

  {
    name: "Digital Clock",

    description:
      "A Digital Clock is a web program that displays the current time on a webpage. HTML is used to create the basic structure, CSS designs the clock display, and JavaScript gets the current time using the Date object.",

    technology: "Web Tech Java Script",

    github:
      "https://github.com/saranyadaids29-lang/Digital-Clock-using-html-css-js-"
  },

  {
    name: "College Development Website with Java Script",

    description:
      "A responsive and interactive college website designed to showcase academic programs, campus facilities, events, and student resources. This project is built using HTML, CSS, and JavaScript.",

    technology: "Web Tech Java Script",

    github:
      "https://github.com/saranyadaids29-lang/College-Department-Website"
  },

  {
    name: "Password Retry System using Loops",

    description:
      "The Password Retry System allows a user to enter a password with a limited number of attempts. It uses a loop to check the password and locks the account after repeated incorrect entries.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/Password_Retry_System_using_loop"
  },

  {
    name: "Number Guessing Game",

    description:
      "A Number Guessing Game is a game where the computer chooses a random number within a set range. The player tries to guess the number by entering different values.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/Number_guessing_game_using_python"
  },

  {
    name: "Message Generator",

    description:
      "This Python program is a simple message management system. It allows users to send, view, and delete messages using a menu. Messages are stored in a list and controlled using loops and conditional statements.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/message_generator_using_python"
  },

  {
    name: "Hangman Game",

    description:
      "A simple command-line implementation of the classic Hangman game built using Python. This project demonstrates basic concepts like loops, conditionals, lists, and user input handling.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/Hangman-game-using-Python"
  },

  {
    name: "Dice Game",

    description:
      "This project is a simple command-line Dice Game built using Python. It simulates rolling dice and allows players to compete against the computer.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/Dice-game-using-Python"
  },

  {
    name: "Student Report Generator",

    description:
      "A simple Python-based application designed to automate the creation of student academic reports using student data such as marks, grades, attendance, and performance summaries.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/Student-Report-Generator-using-python"
  },

  {
    name: "Read Write data to file system",

    description:
      "This project demonstrates how to perform file handling operations in Python, including reading, writing, and appending data to files.",

    technology: "python Authomation",

    github:
      "https://github.com/saranyadaids29-lang/-Read-write-data-to-file-system-using-python"
  }
];

function Projects() {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, 8);

  return (
    <section id="projects">

      <h2 className="section-title">
        Projects
      </h2>

      <div className="projects-grid">

        {visibleProjects.map((project) => (

          <div
            className="project-card"
            key={project.name}
          >

            <div>

              <h3 className="project-name">
                {project.name}
              </h3>

              <p className="project-desc">
                {project.description}
              </p>

            </div>

            <div>

              <span className="project-badge">
                {project.technology}
              </span>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project →
              </a>

            </div>

          </div>

        ))}

      </div>


      <button
        type="button"
        className="show-more-btn"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll
          ? "Show Less Projects"
          : "Show More Projects"}
      </button>

    </section>
  );
}

export default Projects;
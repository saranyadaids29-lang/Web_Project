import Header from "./Header";
import Profile from "./Profile";
import About from "./About";
import Skill from "./Skill";
import Goal from "./Goal";
import Contact from "./Contact";
import Footer from "./Footer";
import "./style.css";

function App() {
  const person = {
    name: "Saranya",
    role: "B.Tech Artificial Intelligence and Data Science Student",
    email: "dsaranya360@gmail.com",
    phone: "9363877696",
    github: "https://github.com/saranyadaids29-lang"
  };

  const aboutText =
    "I am a passionate Artificial Intelligence and Data Science student interested in web development, programming and machine learning.";

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "UI & UX",
    "Git"
  ];

  const goal =
    "My career goal is to become a skilled software developer and build useful applications using AI and modern web technologies.";

  return (
    <div className="page">
      <Header
        title="Personal Introduction"
        subtitle="Welcome to my personal profile"
      />

      <Profile
        name={person.name}
        role={person.role}
      />

      <About description={aboutText} />

      <Skill skills={skills} />

      <Goal objective={goal} />

      <Contact
        email={person.email}
        phone={person.phone}
        github={person.github}
      />

      <Footer message="Thank you for visiting my personal introduction page!" />
    </div>
  );
}

export default App;
const skills = [
  {
    title: "Java Programming",
    description:
      "Developing robust backend logic, standalone systems, and structured algorithms using strong typing metrics.",
    percentage: 85
  },

  {
    title: "Python Automation",
    description:
      "Writing clean, multi-purpose scripts, automated workflows, data operations, and rapid software prototypes.",
    percentage: 80
  },

  {
    title: "Java OOPs Concepts",
    description:
      "Implementing strict design architectures based on Inheritance, Polymorphism, Encapsulation, and Abstraction principles.",
    percentage: 88
  },

  {
    title: "UI and UX Design",
    description:
      "Crafting intuitive user flows, clear low-to-high fidelity layout wireframes, and optimized accessibility layouts.",
    percentage: 82
  },

  {
    title: "Web Technology",
    description:
      "Constructing interactive interfaces using structured semantic HTML structures, fluid CSS configurations, and dynamic script integrations.",
    percentage: 90
  }
];

function Skills() {
  return (
    <section id="skills">

      <h2 className="section-title">
        My Skills
      </h2>

      <p className="section-subtitle">
        Experienced in object-oriented systems, scripting architectures,
        and responsive interface workflows.
      </p>

      <div className="skills-card-grid">

        {skills.map((skill) => (
          <div
            className="skill-premium-card"
            key={skill.title}
          >

            <h3 className="skill-card-title">
              {skill.title}
            </h3>

            <p className="skill-card-description">
              {skill.description}
            </p>

            <div className="progress-bar-container">

              <div
                className="progress-fill"
                style={{
                  width: `${skill.percentage}%`
                }}
              />

            </div>

            <span className="skill-percentage">
              {skill.percentage}%
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Skills;
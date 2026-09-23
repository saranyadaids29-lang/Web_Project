function Skill(props) {
  return (
    <section className="section">
      <h2>Technical Skills</h2>

      <ul className="skills">
        {props.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skill;
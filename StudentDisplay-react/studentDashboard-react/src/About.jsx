function About(props) {
  return (
    <section className="section">
      <h2>About Me</h2>
      <p>{props.description}</p>
    </section>
  );
}

export default About;
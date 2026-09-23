function Contact(props) {
  return (
    <section className="section">
      <h2>Contact</h2>

      <p>
        <strong>Email:</strong> {props.email}
      </p>

      <p>
        <strong>Phone:</strong> {props.phone}
      </p>

      <p>
        <strong>GitHub:</strong>{" "}
        <a href={props.github} target="_blank">
          GitHub Profile
        </a>
      </p>
    </section>
  );
}

export default Contact;
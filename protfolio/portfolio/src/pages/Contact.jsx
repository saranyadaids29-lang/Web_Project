function Contact() {
  return (
    <section id="contact">

      <h2 className="section-title">
        Contact Me
      </h2>

      <p className="contact-subtitle">
        Let's connect! Reach out directly or find me on my professional platforms.
      </p>


      <div className="contact-combined-grid">

        <div className="contact-column-socials">

          <a
            href="https://www.linkedin.com/in/saranya-d-b7a22a386/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-link"
          >

            <div className="contact-icon">
              💼
            </div>

            <div className="contact-info">

              <h3>
                Connect on LinkedIn
              </h3>

              <p>
                View my professional network & career updates
              </p>

            </div>

            <span className="arrow-icon">
              →
            </span>

          </a>


          <a
            href="https://github.com/saranyadaids29-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-link"
          >

            <div className="contact-icon">
              💻
            </div>

            <div className="contact-info">

              <h3>
                Explore my GitHub
              </h3>

              <p>
                Check out my repositories & projects
              </p>

            </div>

            <span className="arrow-icon">
              →
            </span>

          </a>

        </div>


        <div className="contact-column-form">

          <form
            className="combined-message-form"
            action="https://api.web3forms.com/submit"
            method="POST"
          >

            <input
              type="hidden"
              name="access_key"
              value="67e3d2e7-25fd-489d-b43e-682b69810f97"
            />

            <input
              type="hidden"
              name="from_name"
              value="Portfolio Contact Notification"
            />


            <div className="form-row-split">

              <div className="form-field-group">

                <label htmlFor="form-name">
                  Name
                </label>

                <input
                  type="text"
                  id="form-name"
                  name="visitor_name"
                  placeholder="Your Name"
                  required
                />

              </div>


              <div className="form-field-group">

                <label htmlFor="form-email">
                  Email
                </label>

                <input
                  type="email"
                  id="form-email"
                  name="visitor_email"
                  placeholder="Your Email"
                  required
                />

              </div>

            </div>


            <div className="form-field-group">

              <label htmlFor="form-message">
                Message
              </label>

              <textarea
                id="form-message"
                name="visitor_message"
                rows="4"
                placeholder="Type your message here..."
                required
              />

            </div>


            <button
              type="submit"
              className="send-message-btn"
            >
              <span>
                Send Message
              </span>

              <span>
                ⚡
              </span>
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;
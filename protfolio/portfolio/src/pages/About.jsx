import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about">

      <div className="hero-split-layout">

        <div className="hero-text-side">

          <p className="hero-tagline">
            Hi there, I am
          </p>

          <h1>
            Saranya D
          </h1>

          <h2>
            Aspiring Software Engineer
          </h2>

          <p className="hero-description">
            I am currently pursuing my B.Tech in{" "}
            <strong>
              Artificial Intelligence and Data Science (AI&DS)
            </strong>{" "}
            at{" "}
            <strong>
              Prince Dr. K. Vasudevan College of Engineering and Technology
            </strong>.
          </p>

          <p className="hero-description">
            Driven by a passion for creating data-driven applications,
            my core objective is to grow into a skilled{" "}
            <strong>Web Developer</strong>{" "}
            who builds intelligent backend systems wrapped inside
            exceptional user interfaces.
          </p>

          <div className="hero-buttons">

            <Link
              to="/projects"
              className="btn"
            >
              View My Work
            </Link>

            <a href="/projects/portfolio/Saranya resume.pdf"
              download
              className="btn btn-secondary"
            >
              Download Resume
              <span>
                ↓
              </span>
            </a>

          </div>

        </div>


        <div className="hero-image-side">

          <div className="hero-avatar-wrapper">

            <img
  src="/projects/portfolio/profile.png"
  alt="Saranya D Hero Avatar"
  className="hero-avatar-img"
/>          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
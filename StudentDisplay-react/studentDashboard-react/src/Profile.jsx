import profile from "./assets/profile.jpeg";
function Profile(props) {
  return (
    <section className="section profile">
      <img
      src={profile}
      alt="saranya-image"
      className = "profile-image"
      />
      <h2>Profile</h2>
      <h3>{props.name}</h3>
      <p>{props.role}</p>
    </section>
  );
}

export default Profile;
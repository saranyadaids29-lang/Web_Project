import React from "react";
import "./Hobby.css";

function HobbyCard({ image, name, description }) {
  return (
    <div className="hobby-card">
      <img src={image} alt={name} className="hobby-image" />

      <div className="hobby-content">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default HobbyCard;
import React from "react";

const OrganizerSection = ({ organizers }) => (
  <section className="section  organizers  about-organizers">
    <div className="container  organizers-container">
      <h2 className="organizers-title">{organizers.title}</h2>
      <ul className="organizers-list">
        {organizers.gallery.map((galleryImage, index) => (
          <li key={index} className="organizers-listItem">
            <span className="organizers-role">{galleryImage.role}</span>
            <span className="organizers-listItemName">{galleryImage.name}</span>
            <span className="organizers-organization">{galleryImage.organization}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default OrganizerSection;
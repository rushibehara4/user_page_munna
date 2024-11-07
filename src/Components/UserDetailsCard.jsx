import React from "react";
import "./UserDetailsCard.css";

const UserDetailsCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <h2>{user.fullName}</h2>
        <p className="email">{user.email}</p>
      </div>
      <div className="card-body">
        <p>
          <strong>Experience:</strong> {user.experience} years
        </p>
        <p>
          <strong>Current Company:</strong> {user.currentCompany}
        </p>

        {user.itExperienceDescription && (
          <p>
            <strong>IT Experience:</strong> {user.itExperienceDescription}
          </p>
        )}

        <p>
          <strong>Skills Learned:</strong> {Array.isArray(user.skillsLearned) ? user.skillsLearned.join(", ") : "N/A"}
        </p>

        <div className="previous-companies">
          <h4>Previous Companies:</h4>
          {Array.isArray(user.previousCompanies) && user.previousCompanies.length > 0 ? (
            user.previousCompanies.map((company, index) => (
              <div key={company._id || index} className="previous-company">
                <p>
                  <strong>Domain:</strong> {company.domain}
                </p>
                <p>
                  <strong>Skills:</strong> {Array.isArray(company.skills) ? company.skills.join(", ") : "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>No previous companies listed.</p>
          )}
        </div>
      </div>
      <div className="card-footer">
        {user.linkedinProfile1 && (
          <a
            href={user.linkedinProfile1}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
          >
            <i className="fab fa-linkedin"></i> LinkedIn 1
          </a>
        )}
        {user.linkedinProfile2 && (
          <a
            href={user.linkedinProfile2}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
          >
            <i className="fab fa-linkedin"></i> LinkedIn 2
          </a>
        )}
        {user.cvLink && (
          <a
            href={user.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-link"
          >
            View CV
          </a>
        )}
      </div>
    </div>
  );
};

export default UserDetailsCard;

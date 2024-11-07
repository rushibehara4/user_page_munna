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
          <strong>Skills Learned:</strong>{" "}
          {Array.isArray(user.skillsLearned)
            ? user.skillsLearned.join(", ")
            : "N/A"}
        </p>

        {/* Render Previous Companies only if the array is not empty */}
        {Array.isArray(user.previousCompanies) && user.previousCompanies.length > 0 && (
          <div className="previous-companies">
            <h4>Previous Companies:</h4>
            {user.previousCompanies.map((company, index) => (
              <div key={company._id || index} className="previous-company">
                <p>
                  <strong>Domain:</strong> {company.domain}
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {Array.isArray(company.skills)
                    ? company.skills.join(", ")
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer">
        {/* Display LinkedIn Profiles only if the array has values */}
        {user.linkedinProfiles && user.linkedinProfiles.length > 0 && (
          <>
            <h4>LinkedIn Profiles:</h4>
            {user.linkedinProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-icon"
              >
                <i className="fab fa-linkedin"></i> LinkedIn {index + 1}
              </a>
            ))}
          </>
        )}

        {/* CV Link */}
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

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    already: "",
    email: "",
    mobileNumber: "",
    password: "",
    dob: "",
    relocate: "",
    currentLocation: "",
    experience: "",
    realExperience: "",
    realItExperience: "",
    itExperienceDescription: "",
    skillsLearned: "",
    currentCompany: "",
    currentCompanySkills: "",
    previousCompanies: Array(5).fill({ domain: "", skills: "" }),
    cvLink: "",
    linkedinUrls: Array(2).fill(""),
    resumeReviewed: "",
    resumeReviewedStewards: "",
    mockClear: "",
    round2Clear: "",
    h1b: "",
    round1Comments: "",
    round2Comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (name.startsWith("previousCompanies")) {
      const [_, index, field] = name.match(/previousCompanies\.(\d+)\.(\w+)/);
      const idx = parseInt(index, 10);
      setFormData((prevState) => {
        const previousCompanies = [...prevState.previousCompanies];
        previousCompanies[idx] = { ...previousCompanies[idx], [field]: value };
        return { ...prevState, previousCompanies };
      });
    } else if (name.startsWith("linkedinUrls")) {
      const index = parseInt(name.match(/linkedinUrls(\d+)/)[1], 10);
      setFormData((prevState) => {
        const linkedinUrls = [...prevState.linkedinUrls];
        linkedinUrls[index] = value;
        return { ...prevState, linkedinUrls };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formattedData = {
      ...formData,
      previousCompanies: formData.previousCompanies.map((company) => ({
        domain: company.domain,
        skills: company.skills.split(",").map((skill) => skill.trim()),
      })),
    };

    try {
      const response = await fetch(
        "https://reg-page-munna.vercel.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        }
      );

      let data;
      if (response.headers.get("content-type")?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
        throw new Error(data || "An unexpected error occurred");
      }

      if (!response.ok)
        throw new Error(data.message || "Network response was not ok");

      toast.success("Form submitted successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (
    label,
    name,
    type = "text",
    required = false,
    placeholder = ""
  ) => (
    <div className="input-elements">
      <label htmlFor={name} className="label-element">
        {label} {required && <span className="star">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          onChange={handleInputChange}
          value={formData[name]}
          required={required}
          className="input-element"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          onChange={handleInputChange}
          value={formData[name]}
          required={required}
          className="input-element"
          placeholder={placeholder}
        />
      )}
      <br />
    </div>
  );

  const renderSelectField = (label, name, options, required = false) => (
    <div className="select-elements">
      <label htmlFor={name} className="label-element">
        {label} {required && <span className="star">*</span>}
      </label>
      <select
        name={name}
        onChange={handleInputChange}
        value={formData[name]}
        required={required}
        className="input-element"
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
    </div>
  );

  const renderForm = () => (
    <form className="form-container" onSubmit={handleSubmit}>
      {renderInputField(
        "Full Name",
        "fullName",
        "text",
        true,
        "Enter your full name"
      )}
      {renderSelectField(
        "FM Interviewed Already",
        "already",
        ["yes", "no"],
        true
      )}
      {renderInputField(
        "Mobile Number",
        "mobileNumber",
        "text",
        true,
        "Enter your mobile number"
      )}
      {renderInputField("Email", "email", "email", true, "Enter your email")}
      {renderInputField(
        "Password",
        "password",
        "password",
        true,
        "Enter a password"
      )}
      {renderInputField(
        "Date of Birth",
        "dob",
        "date",
        true,
        "Enter your date of birth"
      )}
      {renderSelectField(
        "Willing to Relocate",
        "relocate",
        ["yes", "no"],
        true
      )}
      {renderInputField(
        "Current Location",
        "currentLocation",
        "text",
        true,
        "Enter current location"
      )}
      {renderInputField(
        "Years of Experience",
        "experience",
        "number",
        true,
        "Total experience in years"
      )}
      {renderInputField(
        "Real-time QA Experience",
        "realExperience",
        "text",
        true,
        "QA experience details"
      )}
      {renderInputField(
        "Real-time IT Experience",
        "realItExperience",
        "text",
        true,
        "IT experience details"
      )}
      {renderInputField(
        "IT Experience Description",
        "itExperienceDescription",
        "textarea",
        true,
        "Describe your IT experience"
      )}
      {renderInputField(
        "Skills Learned",
        "skillsLearned",
        "text",
        true,
        "Skills learned in your career"
      )}
      {renderInputField(
        "Current Company Domain",
        "currentCompany",
        "text",
        true,
        "Domain of current company"
      )}
      {renderInputField(
        "Current Company Skills",
        "currentCompanySkills",
        "text",
        true,
        "Skills used in current company"
      )}
      {formData.previousCompanies.map((company, index) => (
        <div key={index} className="previous-label-input">
          {renderInputField(
            `Previous Company Domain ${index + 1}`,
            `previousCompanies.${index}.domain`,
            "text",
            false,
            "Enter domain"
          )}
          {renderInputField(
            `Previous Company Skills ${index + 1}`,
            `previousCompanies.${index}.skills`,
            "text",
            false,
            "Enter skills"
          )}
        </div>
      ))}
      {renderInputField("CV Link", "cvLink", "text", true, "Link to your CV")}
      {formData.linkedinUrls.map((url, index) => (
        <div key={index} className="previous-label-input">
          {renderInputField(
            `LinkedIn URL ${index + 1}`,
            `linkedinUrls.${index}`,
            "text",
            false,
            "Enter LinkedIn URL"
          )}
        </div>
      ))}
      {renderInputField(
        "Resume Reviews by Candidate",
        "resumeReviewed",
        "text",
        true,
        "Reviews count by candidate"
      )}
      {renderInputField(
        "Resume Reviews by Stewards",
        "resumeReviewedStewards",
        "text",
        true,
        "Reviews count by stewards"
      )}
      {renderSelectField(
        "Mock Interview Cleared",
        "mockClear",
        ["yes", "no"],
        true
      )}
      {renderSelectField("Round 2 Cleared", "round2Clear", ["yes", "no"], true)}
      {renderSelectField("H1B Picked", "h1b", ["yes", "no"], true)}
      {renderInputField(
        "Round 1 Comments",
        "round1Comments",
        "textarea",
        false,
        "Comments for round 1"
      )}
      {renderInputField(
        "Round 2 Comments",
        "round2Comments",
        "textarea",
        false,
        "Comments for round 2"
      )}
      <div className="button-container">
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="register-container">
      <h1 className="heading">Register Your Information</h1>
      <p className="para">Enter Your Details to Create an Account</p>
      {renderForm()}
      <ToastContainer />
    </div>
  );
};

export default Register;

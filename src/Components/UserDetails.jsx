// UserDetails.jsx
import React, { useEffect, useState } from "react";
import UserDetailsCard from "./UserDetailsCard";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API endpoint
    fetch("https://reg-page-munna.vercel.app")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="user-cards-container">
      <h1>User Details</h1>
      <div className="user-card-bg-container">
        {users.map((user) => (
          <UserDetailsCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserDetails;

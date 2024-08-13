import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    age: "",
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        name: "Mukesh Sah",
        email: "mukeshsah@gmail.com",
        location: "Kathmandu, Nepal",
        age: 21,
        bio: "Hey, I am Mukesh and I am from Dhaunsha District.",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      };

      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        background: "#f7f7f7",
      }}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "40px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          maxWidth: "500px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          User Profile
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={user.profileImage}
            alt="Profile"
            style={{
              height: "150px",
              width: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
          <a
            href="/editprofile"
            style={{
              marginTop: "20px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Edit Profile
          </a>
        </div>

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#555",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>{user.name}</h2>
          <p style={{ marginBottom: "10px" }}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Location:</strong> {user.location}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Age:</strong> {user.age}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Bio:</strong> {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

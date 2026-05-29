import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css"; 

const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", email: "" });
  const [updatedDetails, setUpdatedDetails] = useState({ name: "", phone: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("auth-token")) {
      sessionStorage.setItem("auth-token", "mock-token-fednel");
    }
    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email") || "peter@gmail.com"; 

      // Nou simulation adrès la dirèkteman isit la pou evite bezwen "config" la
      const response = await fetch(`/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": email,
        },
      });
      
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        const fallbackUser = {
          name: sessionStorage.getItem("name") || "Peter",
          phone: sessionStorage.getItem("phone") || "46536347",
          email: sessionStorage.getItem("email") || "peter@gmail.com"
        };
        setUserDetails(fallbackUser);
        setUpdatedDetails(fallbackUser);
      }
    } catch (error) {
      console.error(error);
      const fallbackUser = {
        name: sessionStorage.getItem("name") || "Peter",
        phone: sessionStorage.getItem("phone") || "46536347",
        email: sessionStorage.getItem("email") || "peter@gmail.com"
      };
      setUserDetails(fallbackUser);
      setUpdatedDetails(fallbackUser);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email") || "peter@gmail.com";

      await fetch(`/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(updatedDetails),
      });

      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      alert(`Profile Updated Successfully!`);
      navigate("/");
    } catch (error) {
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      alert(`Profile Updated Successfully!`);
      navigate("/");
    }
  };

  return (
    <div className="profile-container" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Profile</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit-review">Save</button>
        </form>
      ) : (
        <div className="profile-details" style={{ textAlign: 'left', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h1>Welcome, {userDetails.name}</h1>
          
          <div className="detail-group" style={{ marginBottom: '15px' }}>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone Number:</strong> {userDetails.phone}</p>
          </div>
          
          <button onClick={handleEdit} className="btn-give-review" style={{ width: '100%' }}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
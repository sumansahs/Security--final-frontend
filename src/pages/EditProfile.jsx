import React, { useState } from 'react';

const EditProfile = () => {
  // State variables for storing user profile data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle saving the profile
  const handleSaveProfile = () => {
    // Here you can implement the logic to save the profile data
    console.log('Profile saved:', { name, email, location, age, bio, image });
  };

  // Function to handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div style={{ width: '500px', margin: '0 auto', padding: '30px', border: '5px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: 'blue', fontWeight: 'bold' }}>Edit Profile</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      {image && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <img src={image} alt="Profile Preview" style={{ maxWidth: '100%', borderRadius: '10px' }} />
        </div>
      )}
      <button onClick={handleSaveProfile} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: 'blue', color: '#fff', cursor: 'pointer', width: '100%' }}>Save Changes</button>
    </div>
  );
};

export default EditProfile;

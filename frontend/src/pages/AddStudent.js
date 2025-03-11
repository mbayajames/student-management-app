import React, { useState } from 'react';
import axios from 'axios';
import "../styles/AddStudent.css";

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/students', { firstName, lastName, gender });
      console.log('Response:', response.data); // Log server response
      alert('Student added successfully');
      setFirstName('');
      setLastName('');
      setGender('');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Log error details
      alert('Failed to add student. Check console for details.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
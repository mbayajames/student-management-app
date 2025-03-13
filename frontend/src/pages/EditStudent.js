import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AddStudent.css';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/students/${id}`);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/students/${id}`, { firstName, lastName, gender });
      alert('Student updated successfully');
      navigate('/students');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-student-container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit} className="add-student-form">
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
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
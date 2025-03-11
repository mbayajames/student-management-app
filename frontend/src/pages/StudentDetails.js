import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="student-details-container">
      <h1>Student Details</h1>
      <div className="student-details">
        <p><strong>First Name:</strong> {student.firstName}</p>
        <p><strong>Last Name:</strong> {student.lastName}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
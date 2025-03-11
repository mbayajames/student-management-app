import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      alert('Student deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="students-container">
      <h1>Students List</h1>
      <ul className="students-list">
        {students.map((student) => (
          <li key={student._id} className="student-item">
            <span>{student.firstName} {student.lastName}</span>
            <span>{student.gender}</span>
            <div className="actions">
              <div className="dropdown">
                <button className="dropdown-toggle">Action</button>
                <div className="dropdown-menu">
                  <Link to={`/edit-student/${student._id}`} className="dropdown-item">Edit</Link>
                  <Link to={`/student-details/${student._id}`} className="dropdown-item">View Details</Link>
                </div>
              </div>
              <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
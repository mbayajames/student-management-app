import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap dropdowns work
import "react-toastify/dist/ReactToastify.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:4000/api/students/getAllStudent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      toast.error("Failed to fetch students", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Students List</h2>
      <table className="table table-striped table-hover shadow-lg">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.firstname}</td>
            <td>{student.lastname}</td>
            <td>{student.gender}</td>
            <td>
              <div className="dropdown">
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id={`dropdownMenuButton${index}`} 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Actions
                </button>
                <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                  <li>
                    <Link className="dropdown-item" to={`/edit-student/${student.id || student.student_id || student._id}`}>
                      Edit Student
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/student-details/${student.id || student.student_id || student._id}`}>
                      View Details
                    </Link>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

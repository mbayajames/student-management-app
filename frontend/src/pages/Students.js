import React, { useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, firstName: "John", lastName: "Doe", gender: "Male" },
    { id: 2, firstName: "Ian", lastName: "Mark", gender: "Male" },
    { id: 3, firstName: "Mary", lastName: "Maina", gender: "Female" },
    { id: 4, firstName: "Allan", lastName: "ONTITA", gender: "Male" },
    { id: 5, firstName: "Mbuzi", lastName: "Kondoo", gender: "Male" },
    { id: 6, firstName: "Jim", lastName: "Carrey", gender: "Male" },
    { id: 7, firstName: "Annitah", lastName: "Khan", gender: "Female" },
    { id: 8, firstName: "Millicent", lastName: "Okari", gender: "Female" },
  ]);

  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // View details function
  const viewDetails = (student) => {
    setSelectedStudent(student);
    setDropdownIndex(null);
  };

  // Open edit modal
  const editStudent = (student) => {
    setEditingStudent(student);
    setDropdownIndex(null);
  };

  // Handle delete confirmation
  const deleteStudent = (student) => {
    setConfirmDelete(student);
    setDropdownIndex(null);
  };

  // Confirm delete function
  const confirmDeleteStudent = () => {
    setStudents(students.filter((s) => s.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
    setEditingStudent(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students List</h2>

      {/* Student Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} style={index % 2 === 0 ? rowStyle : alternateRowStyle}>
              <td style={cellStyle}>{student.firstName}</td>
              <td style={cellStyle}>{student.lastName}</td>
              <td style={cellStyle}>{student.gender}</td>
              <td style={cellStyle}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button style={actionButtonStyle} onClick={() => toggleDropdown(index)}>
                    Action ▼
                  </button>
                  {dropdownIndex === index && (
                    <ul style={dropdownStyle}>
                      <li onClick={() => viewDetails(student)}>View Details</li>
                      <li onClick={() => editStudent(student)}>Edit</li>
                      <li onClick={() => deleteStudent(student)}>Delete</li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Details Modal */}
      {selectedStudent && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Student Details</h3>
            <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <button onClick={() => setSelectedStudent(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Student</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editingStudent.firstName}
                onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                value={editingStudent.lastName}
                onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                required
              />
              <select
                value={editingStudent.gender}
                onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingStudent(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Are you sure?</h3>
            <p>Do you want to delete {confirmDelete.firstName}?</p>
            <button onClick={confirmDeleteStudent}>Yes, Delete</button>
            <button onClick={() => setConfirmDelete(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const tableHeaderStyle = { padding: "10px", borderBottom: "2px solid #ddd" };
const cellStyle = { padding: "10px", borderBottom: "1px solid #ddd" };
const rowStyle = { backgroundColor: "#fff" };
const alternateRowStyle = { backgroundColor: "#f9f9f9" };
const actionButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#333",
};
const dropdownStyle = {
  position: "absolute",
  top: "100%",
  left: "0",
  backgroundColor: "white",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  listStyle: "none",
  padding: "5px 0",
  margin: "0",
  width: "120px",
  zIndex: 1,
};
const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
};

export default Students;

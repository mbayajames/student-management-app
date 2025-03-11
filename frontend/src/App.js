import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddStudent from './pages/AddStudent';
import Students from './pages/Students';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students" element={<Students />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/student-details/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
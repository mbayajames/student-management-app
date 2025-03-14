const mongoose = require("mongoose");
const Student = require("../models/studentsModels");
const createError = require("http-errors");

module.exports = {

    // Get all students
  getAllStudents: async (req, res, next) => {
    try {
      const result = await Student.find();
      res.json(result);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      next(error);
    }
  },

  // Get a student by ID
  getStudentById: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Validate MongoDB ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid student ID format" });
      }

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Add a new student
  addStudent: async (req, res, next) => {
    try {
      const student = new Student(req.body);
      const result = await student.save();
      res.status(201).json(result);
    } catch (error) {
      console.error("Error adding student:", error.message);
      next(error);
    }
  },

  // Delete a student
  deleteStudent: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("Received student ID:", id);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, "Invalid student ID"));
      }

      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return next(createError(404, "Student does not exist"));
      }

      res.json({ message: "Student deleted successfully", student });
    } catch (error) {
      console.error("Error deleting student:", error.message);
      next(createError(500, "Internal Server Error"));
    }
  },

  updateStudent: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, "Invalid student ID"));
      }

      const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedStudent) {
        return next(createError(404, "Student not found"));
      }

      res.json(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid student ID"));
      }
      next(error);
    }
  }
};
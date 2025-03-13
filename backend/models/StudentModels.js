const Student_controller = req('../Controlers/studentController.js');
const express = req('express');

const Student_Route = express.Router();

Student_Route.get('/getAllStudents', Student_controller.getAllStudents);


Student_Route.post('/addStudents', Student_controller.addStudent);


Student_Route.get('/getStudentById/id:', Student_controller.getStudentById);


Student_Route.patch('/updateStudent/id:', Student_controller.updateStudent);


Student_Route.delete('/deleteStudent/id:', Student_controller.deleteStudent);

module.exports = Student_Route;
const express = require("express");
const studentscontroller = require("../controllers/studentscontroller");
const { verifyAccessToken } = require("../helpers/jwtHelper");

// const authcontroller = require('../controllers/authcontroller');
const router = express.Router();

//  GET all students
router.get('/getAllStudent', studentscontroller.getAllStudent);

router.post('/Addstudent', studentscontroller.Addstudent);

router.put('/updatestudent/:id', studentscontroller.updatestudent);

router.delete('/deletestudent/:id', studentscontroller.deletestudent);


//  PUT - Update a student by ID
router.put('/students/:id', (req, res) => {
    res.send({ type: 'Update Request' });
});

// DELETE - Delete a student by ID
router.delete('/students/:id', (req, res) => {
    res.send({ type: 'Delete Request' });
});

module.exports = router;
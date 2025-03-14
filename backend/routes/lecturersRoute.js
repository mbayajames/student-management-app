const express = require("express");
const lecturercontrollers = require("../controllers/lecturerscontrollers");
const router = express.Router();

//  GET all lecturers
router.get('/getAllLecturer', lecturercontrollers.getAllLecturer);

router.post('/Addlecturer', lecturercontrollers.Addlecturer);

router.put('/updatelecturer/:id', lecturercontrollers.updatelecturer);

router.delete('/:id', lecturercontrollers.deleteLecturer);

router.put('/lecturers/:id', (req, res) => {
    res.send({ type: 'Update Request' });
});

router.delete('/lecturers/:id', (req, res) => {
    res.send({ type: 'Delete Request' });
});

module.exports = router;
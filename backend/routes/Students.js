const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/Student');


//Add a Student
router.post('/', async (req, res) => {
    const { firstName, lastName , gender } = req.body;
    try {
        const student = new Student({ firstName, lastName, gender });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Get all students
router.get('/', async (req, res) => {
    try{
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;
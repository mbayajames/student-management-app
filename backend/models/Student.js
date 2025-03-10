const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other']
},
});

module.exports = mongoose.model('Student', StudentSchema);
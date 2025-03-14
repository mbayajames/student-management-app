const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    firstname:{
        type:String,
        require:[true, 'Firstname is required']
    },
    lastname:{
        type:String,
        require:[true, 'Lastname is required']
    },
    gender:{
        type: String
    }
});

const Lecturer = mongoose.model('lecturer', lecturerSchema);
module.exports = Lecturer;
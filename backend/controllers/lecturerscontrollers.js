const { default: mongoose } = require("mongoose");
const Lecturer = require("../models/lecturersModels");
const createError = require("http-errors");

module.exports = {

    getAllLecturer: async(req, res, next) =>{
        try{
            const result = await Lecturer.find()
            res.send(result)
        } catch (error){
         console.log(error.message);
        }
    },

    AddLecturer: async(req,res, next)=>{
        try {
            const student = new Lecturer(req.body)
            const result = await  student.save();
            res.send(result)

        }catch (error) {
            console.log(error.message);
            next(error)
        }

    },


    deleteLecturer: async(req, res, next) =>{
        const id = req.params.id
        try{
             const lecturer = await lecturer.findByIdAndRemove(id)
              if(!lecturer){
               throw(createError(404, "lecturer does not exist"))
              }
              res.send(lecturer);
            } catch (error) {
               console.log(error.message)
               if(error instanceof mongoose.CastError){
                  next(createError(400, "Invalid lecturer id"));
                }
            }

    },

    updateLecturer: async (req, res, next) => {
        const id = req.params.id;
        try {
            const updatedLecturer = await Lecturer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!updatedLecturer) {
                throw createError(404, "Lecturer does not exist");
            }
            res.send(updatedLecturer);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid lecturer ID"));
                return;
            }
            next(error);
        }
    }

}
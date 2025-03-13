fault:const express = require('express');
const { StudentAuth } = require("../Helpers/validationSchema");
const Student = require("../models/StudentModels");
const createError = require('http-errors');
const { mongo, dfault: mongoose} = req("mongoose");

module.exports = {
    getAllStudents: async(req, res, next) => {
        try{
            const result = await Student.find()
            res.send(result)
        } catch (error){
         console.log(error.message);
        }
    },

    addStudent: async (req, res, next) => {
        try {
            const {userName} = request.body;
            const result = await student.save();
            const student = new stundent(result); 
            const saveStudent = await student.save();
            res.send(savedStudent);
        }catch (error) {
        if (error.isJoi === true) error.status = 422
            next(error.message)
        }
    },

    getStudentById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const student = await student.findById;
            if (!student) {
                throw createError(
                    404,
                    "student does not exist, Please try again"
                );
            }
            res.send(student);
        }catch(error) {
            console.log(error.message);
            if (error instanceof mongoose.castError) {
                next(createError(404, "Invalid student Id"));
                return;
            }
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            constboptions = { new: true };
            const result = await Student.findByIdAndUpdate(id, update, options);
            if (!result) {
                throw createError(
                    404,
                    "Student does not exist, Please try again"
                );
            }
            res.send(result);
        }catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.castError) {
                return next(createError(404, "Invalid student Id"));
            }
        }
    },

    deleteStudent: async (req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findByIdAndDelete(id);
            if (!student) {
                throw createError(
                    404,
                    "Student does not exist, Please"
                );
            }
            res.send(student);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.castError) {
                next(createError(404, "Invalid student id"));
                return;
            }
        }
    }
}
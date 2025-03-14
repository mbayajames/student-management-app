const { authSchema } = require("../helpers/validationschema");
const authmodel = require("../models/authmodel");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../helpers/jwtHelper");

module.exports = {

    register: async (req, res, next) => {
        try {
          // Validate request body
          const result = await authSchema.validateAsync(req.body);
    
          // Check if user already exists
          const exists = await authmodel.findOne({ email: result.email });
          if (exists)
            throw createError.Conflict(
              `${result.email} has already been registered`
            );
    
          const user = new authmodel({
            email: result.email,
            password: result.password,
          });
    
          // Save user to database
          await user.save();
    
          // Send response
          res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
          if (error.isJoi === true) {
            error.status = 422;
          }
          next(error);
        }
      },

      login: async (req, res, next) => {
        try {
          const result = await authSchema.validateAsync(req.body);
          const user = await authmodel.findOne({ email: result.email });
          if (!user) throw createError.NotFound("user not registered");
    
          //matching the password
    
          const isMatch = await user.isValidPassword(result.password);
          if (!isMatch)
            throw createError.Unauthorized("Username/password not valid");
    
          //if password match then generate token
          const accessToken = await signAccessToken(user.id, user.role);
          const refreshToken = await signRefreshToken(user.id);
    
          res.send({ accessToken , refreshToken});
        } catch (error) {
          if (error.isJoi === true)
            return next(createError.BadRequest("Invalid username/password"));
          next(error);
        }
      },
};
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const students = require("../models/studentsModels");

module.exports = {

    signAccessToken: (UserId,userRole) => {
        return new Promise((resolve, reject) => { 
          const payload = {UserId, userRole}; 
          const secret = process.env.ACCESS_TOKEN_SECRET;
          const options = {
            expiresIn: "2h",
            issuer: "EddTechnologies.com",
            audience: UserId,
          };
      
          JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
              console.log(error.message);
              return reject(createError.InternalServerError());
            }
            resolve(token);
          });
        });
      },  

      verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"]) {
          return next(createError.Unauthorized());
        }
      
        const bearerToken = req.headers["authorization"].split(" ")[1];
      
        JWT.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (err) {
            return next(createError.Unauthorized(err.message));
          }
          req.payload = payload;
          next();
        });
      },

      signRefreshToken: (UserId) => {
        return new Promise((resolve, reject) => {
          const payload = {};
          const options = {
            expiresIn: "1d",
            audience: UserId,
          };
    
          JWT.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            options,
            (err, token) => {
              if (err) {
                console.log(err);
                reject(createError.InternalServerError());
              }
              resolve(token);
            }
          );
        });
      },
};

restrict = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.payload?.roles; 
  
      if (!userRole || !allowedRoles.includes(userRole)) {
        return next(createError.Forbidden("Sorry! You don't have access to this resource"));
      }
  
      next(); 
    };
};
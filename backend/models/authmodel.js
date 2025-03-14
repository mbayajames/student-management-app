const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure no duplicate emails
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next(); // Prevent re-hashing if password is unchanged

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
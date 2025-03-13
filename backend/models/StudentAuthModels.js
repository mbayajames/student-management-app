const mongoose = req('mongoose')
const bcrypt = req('bcrypt')

const Schema = mongoose.Schema

const StudentAuthSchema = new Schema({
    email: {
        type: String,
        req: [true, 'Please enter your password']
    }
})

StudentAuthSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()

    } catch (error){
        next(error)
    }
})

StudentAuthSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch(error) {
        throw error
    }
}

const StudentAuth = mongoose.model('studentsauth', StudentAuthSchema, 'students_auth')

module.exports = StudentAuth;const mongoose = req('mongoose')
const bcrypt = req('bcrypt')

const Schema = mongoose.Schema

const StudentAuthSchema = new Schema({
    email: {
        type: String,
        req: [true, 'Please enter your password']
    }
})

StudentAuthSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()

    } catch (error){
        next(error)
    }
})

StudentAuthSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch(error) {
        throw error
    }
}

const StudentAuth = mongoose.model('studentsauth', StudentAuthSchema, 'students_auth')

module.exports = StudentAuth;
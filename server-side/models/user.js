const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define schema of User
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {

    // generate salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        // generate hash (encrypt) 
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) {
                return next(err)
            }
            
            // overwrite old password with encrypted password
            this.password = hash
            next()
        })
    })
})

// define methods usable by user instances
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema)

// Export our model
module.exports = ModelClass
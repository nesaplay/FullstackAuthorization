const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

const tokenForUser = user => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => {
    // User has already had their email/pass authorized / token distribution
    res.send({
        token: tokenForUser(req.user)
    })
}

exports.signup = (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).send({ error: 'Email and Password are required!'})
    }

    // see if a user with a given email exists
    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return next(err)
        }

        // if a user exists, return error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }

        // if a user does not exist, create and save
        const user = new User({
            email,
            password
        })

        user.save(err => {
            if (err) {
                return next(err)
            }

            // respond to request with a token
            res.send({
                token: tokenForUser(user)
            })
        })
    })
}
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const config = require("config");
const authMiddleware = require('../middlewares/authMiddleware')


// @route    POST api/auth/register
// #desc     Authorization a user
// @access   Public
const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
}
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required')
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail()
        .custom(validateEmail)
        .withMessage('Please write correct email'),
    check('password', 'Password is required')
        .not()
        .isEmpty()
        .isLength({min: 4})
        .withMessage('Password length is min 4 chars')
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }
    const {name, email, password} = req.body
    try {
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).send({message: `User with email: ${email} already exist`})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user = await new User({
            name,
            email,
            password: hashPassword
        })

        const payload = {user: {id: user.id}}
        const token = jwt.sign(
            payload,
            config.get('secretKey'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})

        await user.save()
        res.status(201).send({message: 'User registered, now You can login'})

    } catch (e) {
        res.status(500).send({message: 'Some server error'})
    }
})


// @route    POST api/auth/login
// #desc     Auth user and get token
// @access   Public
router.post('/login',
    [
        check('email', 'Email is required').isEmail().normalizeEmail().not().isEmpty(),
        check('password', 'Password is required').exists()
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }
        const {email, password} = req.body

        try {
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'Invalid email or password'})
            }

            const isPassValid = await bcrypt.compare(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: 'Invalid email or password'})
            }

            const payload = {user: {id: user.id}}
            const token = jwt.sign(
                payload,
                config.get('secretKey'),
                {expiresIn: '1h'}
                )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).send({message: 'Some server error'})
        }
    })


// @route    GET api/auth
// #desc     Get logged in user
// @access   Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'Some server error'})
    }
})


module.exports = router
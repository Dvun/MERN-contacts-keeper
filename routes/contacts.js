const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {check, validationResult} = require('express-validator')
const Contact = require('../models/Contact')


// @route    GET api/contacts
// #desc     Get all user contacts
// @access   Public
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.json(contacts)
    } catch (e) {
        res.status(500).json({message: 'Some server error'})
    }
})


// @route    POST api/contacts
// #desc     Add new contact
// @access   Private
router.post('/', [authMiddleware, [
    check('name', 'Name is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, phone, type} = req.body
    try {
        const newContact = await new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })

        const contact = await newContact.save()
        res.json(contact)
    } catch (e) {
        res.status(500).json({message: 'Some server error'})
    }
})


// @route    PUT api/contacts/:id
// #desc     Update contact
// @access   Private
router.put('/:id', authMiddleware, async (req, res) => {
    const {name, email, phone, type} = req.body

    // Build contact object
    const contactFields = {
        name,
        email,
        phone,
        type
    }
    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).json({message: 'Contact not found'})
        await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields})

    res.send('Update contact')
    } catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})


// @route    DELETE api/contacts/:id
// #desc     Delete contact
// @access   Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).json({message: 'Contact not found'})
        await Contact.findByIdAndRemove(req.params.id)
        res.json({message: 'Contact removed'})
    } catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})


module.exports = router
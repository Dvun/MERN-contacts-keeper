const express = require('express')
const router = express.Router()
const User = require('../models/User')


// @route    DELETE api/users/:id
// #desc     Delete a user
// @access   Private
router.delete('/:id', async (req, res) => {
    const userID = req.params.id
    try {
        User.findByIdAndRemove({_id: userID}, (err, result) => {
            if (err) res.json({message: err})
            if (userID) {
                res.send({message: 'User deleted'})
            } else {
                res.send({message: 'User with this email not found'})
            }
        })
    } catch (e) {
        res.status(500).send({message: 'Some server error'})
    }
})


module.exports = router
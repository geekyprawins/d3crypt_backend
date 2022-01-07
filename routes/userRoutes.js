const express = require('express')
const router = express.Router()
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.send("Error " + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send("Error " + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.rank = req.body.rank
        user.points = req.body.points
        const a1 = await user.save()
        res.json(a1)
    } catch (err) {
        res.send("Error " + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const a1 = await user.remove()
        res.send('Removed')
    } catch (err) {
        res.send("Error " + err)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, {
            "username": req.body.username,
            "phone": req.body.phone,
            "college": req.body.college,
            "email": req.body.email,
            "ID": req.body.ID,
            "memNo": req.body.memNo
        });
        console.log(doc);
        res.send("Updated");
    } catch (err) {
        res.send(err);
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        points: req.body.points,
        email: req.body.email,
        password: req.body.password,
        attempts: req.body.attempts
    })
    try {
        const a1 = await user.save()
        res.send(a1)
    } catch (err) {
        console.log("Error " + err)
    }
})

module.exports = router
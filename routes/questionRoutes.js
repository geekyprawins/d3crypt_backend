const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Question = require('../models/questionModel');

const router = Router();

router.get('/check', (req, res) => {
    res.send('OK');
})

router.get('/resume', (req, res) => {
    let user = User.findById(req.body._id);
    let current = user.currentIndex;
    res.send(current);
});

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions)
    } catch (err) {
        res.send("Error " + err)
    }
});

router.post('/add', async (req, res) => {
    const newq = await Question.create({
        title: req.body.title,
        difficulty: req.body.difficulty,
        answer: req.body.answer,
        index: req.body.index,
        image_1: req.body.image_1,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        image_4: req.body.image_4,
        hint_1: req.body.hint_1,
        hint_2: req.body.hint_2
    }, function (err) {
        console.log(err);
        console.log(newq);
    })
    console.log(newq);
    res.send(newq);
})
 

router.get('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        res.json(question)
    }catch(err){
        res.send("Error "+err)
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const q=await Question.findById(req.params.id)
        const data=req.body
        q.image_1=data.image_1
        q.image_2=data.image_2
        q.image_3=data.image_3
        q.image_4=data.image_4
        q.question=data.question
        q.difficulty=data.difficulty
        q.points=data.points
        q.answer=data.answer
        q.hint=data.hint
        const a1= await q.save()
        res.json(a1)
    }catch(err){
        res.send("Error "+err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        const a1= await question.remove()
        res.send('Removed')
    }catch(err){
        res.send("Error "+err)
    }
})


module.exports = router;

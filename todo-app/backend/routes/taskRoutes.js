const router = require('express').Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req , res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});
// Create task

router.post('/', async (req , res) =>{

    if (!req.body.text) {
        return res.status(400).json({message: 'Text is required'});
    }
    const newTask = new Task({text: req.body.text});
    const savedTask = await newTask.save();
    res.json(savedTask);
});

// Update task
router.put('/:id', async (req , res) =>{
    const updated = await Task.findByIdAndUpdate
    (req.params.id, {completed: req.body.completed}, {new: true});
    res.json(updated);
});

// Delete task

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: 'Task deleted'});    
});

module.exports = router;
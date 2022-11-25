const express = require("express");
const taskSchema = require("../models/task");

const getAllTasks = (req, res) => {
    taskSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const getTaskById = (req, res) => {
    const {id} = req.params;
    taskSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const getTaskByIdProyect = (req, res) => {
    const { id } = req.params;
    taskSchema
        .find({projectID : id})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({message: error}))    
};

const postTask = (req, res) => {
    const task = taskSchema(req.body);
    task.status = "pending";
    task
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error}))
};

const updateTask = (req, res) => {
    const { id } = req.params;
    let toUpdate  = req.body;
    
    Object.keys(toUpdate).forEach(key => {
        if(key.includes("Date"))
            try {
                Date.parse(toUpdate[key])
            } catch (error) {
                res.json({message : error})
            }
        if(!toUpdate[key])    
            delete toUpdate[key]
    })

    taskSchema
        .updateOne({ _id: id}, { $set: toUpdate })
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const addInvertedHours = async (req,res) =>{
    const { id } = req.params;
    const hours = req.body.hours;

    const task = await taskSchema.findById(id);
    const invertedHours = task.invertedHours + hours;
    taskSchema
        .updateOne({ _id: id}, { $set: { invertedHours }})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    taskSchema
        .findOneAndUpdate({ _id: id}, { $set: {status}})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const deleteById = (req, res) => {
    const { id } = req.params;
    taskSchema
      .remove({_id : id})
      .then((data) => res.json(data))
      .catch((error) => res.status(404).json({ message: error }))
  };

module.exports  = {
    postTask,
    getAllTasks,
    getTaskById,
    getTaskByIdProyect,
    deleteById,
    updateStatus,
    addInvertedHours,
    updateTask
};
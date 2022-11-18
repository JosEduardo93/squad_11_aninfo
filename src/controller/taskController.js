const express = require("express");
const taskSchema = require("../models/task");

const getAllTasks = (req, res) => {
    taskSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const getTaskById = (req, res) => {
    const {id} = req.params;
    taskSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const postTask = (req, res) => {
    const task = taskSchema(req.body);
    task
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const updateDate = (req, res) => {
    const { id } = req.params;
    const initDate = Date.parse(req.body.initDate);
    const endDate = Date.parse(req.body.endDate);
    if (initDate & endDate) {
        taskSchema
            .updateOne({ _id: id}, { $set: { initDate, endDate }})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}))
    }
};

const addInvertedHours = async (req,res) =>{
    const { id } = req.params;
    const hours = req.body.hours;

    const task = await taskSchema.findById(id);
    const invertedHours = task.invertedHours + hours;
    taskSchema
        .updateOne({ _id: id}, { $set: { invertedHours }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const updateName = (req, res) => {
    const { id } = req.params;
    const { name} = req.body;
    taskSchema
        .updateOne({ _id: id}, { $set: { name }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const updateDescription = (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    taskSchema
        .updateOne({ _id: id}, { $set: { description }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const updateResponsible = (req, res) => {
    const { id } = req.params;
    const { responsible } = req.body;
    taskSchema
        .updateOne({ _id: id}, { $set: {description}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
};

const deleteById = (req, res) => {
    const { id } = req.params;
    taskSchema
      .remove({_id : id})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }))
  };

module.exports  = {
    postTask,
    getAllTasks,
    getTaskById,
    deleteById,
    updateDate,
    updateDescription,
    updateName,
    addInvertedHours,
    updateResponsible
};
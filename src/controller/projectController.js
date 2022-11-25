const express = require("express");
const projectSchema = require("../models/project");

const getAllProject = (req, res) => {
    projectSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};

const getById = (req, res) => {
    const { id } = req.params;
    projectSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error }))
};

const postProject = (req, res) => {
    const project = projectSchema(req.body);
    project
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({message: error}));
};


 const addInvertedHours = async (req,res) =>{
    const { id } = req.params;
    const hours = req.body.hours;
    const project = await projectSchema.findById(id);
    const invertedHours = project.invertedHours + hours;
    projectSchema
        .updateOne({ _id: id}, { $set: { invertedHours }})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};


const updateProject = (req, res) => {
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

    projectSchema
        .updateOne({ _id: id}, { $set: toUpdate })
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
}

const updateStatus = (req, res) => {
    const { id } = req.params;
    const {status} = req.body
    projectSchema
        .findOneAndUpdate({_id : id} , {$set : {status}})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error}))
};

const deleteById = (req, res) => {
    const { id } = req.params;
    projectSchema
      .remove({_id : id})
      .then((data) => res.json(data))
      .catch((error) => res.status(404).json({ message: error }))
  };


module.exports  = {
    postProject,
    getAllProject,
    getById,
    addInvertedHours,
    deleteById,
    updateProject,
    updateStatus
};
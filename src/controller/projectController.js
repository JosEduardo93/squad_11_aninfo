const express = require("express");
const projectSchema = require("../models/project");

const getAllProject = (req, res) => {
    projectSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};

const postProject = (req, res) => {
    const project = projectSchema(req.body);
    project
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }))
};

const getById = (req, res) => {
    const { id } = req.params;
    projectSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}  

const deleteById = (req, res) => {
    const { id } = req.params;
    projectSchema
      .remove({_id : id})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }

const updateDate = (req, res) => {
    const { id } = req.params;
    const initDate = Date.parse(req.body.initDate);
    const endDate = Date.parse(req.body.endDate);
    if (initDate & endDate) {
        projectSchema
            .updateOne({ _id: id}, { $set: { initDate, endDate }})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}))
    }
}

 const addInvertedHours = async (req,res) =>{
    const { id } = req.params;
    const hours = req.body.hours;

    const project = await projectSchema.findById(id);
    const invertedHours = project.invertedHours + hours;
    projectSchema
        .updateOne({ _id: id}, { $set: { invertedHours }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
}

const updateName = (req, res) => {
    const { id } = req.params;
    const { name} = req.body;
    projectSchema
        .updateOne({ _id: id}, { $set: { name }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
}

const updateDescription = (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    projectSchema
        .updateOne({ _id: id}, { $set: { description }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
}

module.exports  = {
    postProject,
    getAllProject,
    getById,
    deleteById,
    updateDate,
    updateDescription,
    updateName,
    addInvertedHours
};
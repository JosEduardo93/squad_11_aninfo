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
      .remove({ _id: id })
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

module.exports  = {
    postProject,
    getAllProject,
    getById,
    deleteById,
    updateDate
};
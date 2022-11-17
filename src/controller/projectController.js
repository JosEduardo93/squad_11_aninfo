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

module.exports  = {
    postProject,
    getAllProject
};
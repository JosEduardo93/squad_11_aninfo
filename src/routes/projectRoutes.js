const express = require("express");
const projectSchema = require("../models/project");

const router = express.Router();


router.get("/all", (req, res) => {
    projectSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

router.post("/create", (req, res) => {
  const project = projectSchema(req.body);
  project
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router
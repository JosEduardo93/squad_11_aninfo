const express = require("express");
const projectController = require("../controller/projectController");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          descrption: name project
 *        description:
 *          type: string
 *          description: description project
 *        idealInitDate:
 *          type: string
 *          description: date init project
 *        idealEndDate:
 *          type: string
 *          description: date end project
 *        invertedHours:
 *          type: integer
 *          description: inverted hour project
 *        initDate:
 *          type: string
 *          description: init date project
 *        endDate:
 *          type: string
 *          description: end date project
 *          
 */
router.get("/projects", projectController.getAllProject)

/**
 * @swagger
 * /api/projects:
 *  post:
 *    summary: create a new user
 *    tags: [Projects]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Project'
 *    responses:
 *      200:
 *        description: new project created
 *      404:
 *        description: failed created
 */
router.post("/projects", projectController.postProject);

module.exports = router
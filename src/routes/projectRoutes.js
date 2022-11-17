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






/**
 * @swagger
 * /api/projects:
 *  get:
 *   summary: get all projects
 *   tags: [Projects]
 *   responses:
 *      200:
 *        description: new user created!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Project'
 */
router.get("/projects", projectController.getAllProject)

/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *    summary: find project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        require: true
 *        description: the project id
 *    responses:
 *      200:
 *          description: a project
 *          content: 
 *            application/json:
 *              type: object
 *              $ref: '#components/schemas/Project'
*/
router.get("/projects/:id", projectController.getById);


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


/**
 * @swagger
 * /api/projects/{id}/dates:
 *  put:
 *    summary: update a user
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *              type: object
 *              properties:
 *                  initDate: 
 *                      type: string
 *                  endDate: 
 *                      type: string
 *    responses:
 *      200:
 *        description: user update
 *      404:
 *        description: user not found
 */
router.put("/projects/:id/dates", projectController.updateDate);


/**
 * @swagger
 * /api/projects/{id}/hours:
 *  put:
 *    summary: add work hours
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *              type: object
 *              properties:
 *                  hours:
 *                      type: integer
 *    responses:
 *      200:
 *        description: add inverted hours
 *      404:
 *        description: hours not added
 */
router.put("/projects/:id/hours", projectController.addInvertedHours)

/**
 * @swagger
 * /api/projects/{id}/description:
 *  put:
 *    summary: update a project description
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *              type: object
 *              properties:
 *                  description: 
 *                      type: string                  
 *    responses:
 *      200:
 *        description: project description update
 *      404:
 *        description: project not found
 */
router.put("/projects/:id/description", projectController.updateDescription);

/**
 * @swagger
 * /api/projects/{id}/projectName:
 *  put:
 *    summary: update a project name
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *              type: object
 *              properties:
 *                  name: 
 *                      type: string                  
 *    responses:
 *      200:
 *        description: project name update
 *      404:
 *        description: project not found
 */
router.put("/projects/:id/projectName", projectController.updateName);



/**
 * @swagger
 * /api/projects/{id}:
 *  delete:
 *    summary: delete a project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *    responses:
 *      200:
 *        description: project deleted
 *      404:
 *        description: project not found
 */
 router.delete("/projects/:id", projectController.deleteById);

module.exports = router
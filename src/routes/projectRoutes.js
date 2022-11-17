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

router.delete("/projects/:id", projectController.deleteById);

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
// router.put("/projects/:id/date/:endDate", projectController.updateEndDate);

module.exports = router
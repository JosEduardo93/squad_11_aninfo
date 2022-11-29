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
 *          description: project name
 *          required: true
 *          default: Project-Name
 *        description:
 *          type: string
 *          description: project description
 *          required: true
 *          default: Description project
 *        idealInitDate:
 *          type: string
 *          description: project ideal init date
 *          format: date-time
 *        idealEndDate:
 *          type: string
 *          description: project ideal end date
 *          format: date-time
 *        invertedHours:
 *          type: integer
 *          description: project inverted hours
 *          default: 0
 *        initDate:
 *          type: string
 *          description: project real init date
 *          format: date-time
 *        endDate:
 *          type: string
 *          description: project real end date
 *          format: date-time
 *        assignedClient:
 *          type: integer
 *          description: client id
 *        status:
 *          type: string
 *          description: project status
 *          default: No Iniciado
 *        type:
 *          type: string
 *          description: project type
 *          default: Desarrollo
 *        projectLeader:
 *          type: integer
 *          description: Project Leader
 *          default: project-leader
 */

/**
 * @swagger
 * /api/projects:
 *  post:
 *    summary: create a new project
 *    tags: [Projects]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             name: 
 *                type: string
 *                default: Project-Name
 *             description:
 *                 type: string
 *                 default: Project description
 *             idealInitDate: 
 *                 type: string
 *                 format: date-time
 *             idealEndDate: 
 *                 type: string
 *                 format: date-time
 *             assignedClient:
 *                 type: integer
 *             type:
 *                  type: string
 *                  default: Desarrollo
 *              projectLeader:
 *                  type: integer
 *                  default: project-leader
 *    responses:
 *      200:
 *        description: new project created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Project'
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
 *        description: all clients listed
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
 *              schema:
 *                  type: object
 *                  $ref: '#components/schemas/Project'
 *      404:
 *          description: not found project 
*/ 
router.get("/projects/:id", projectController.getById);

/**
 * @swagger
 * /api/projects/{id}:
 *  put:
 *    summary: update a project
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
 *            type: object
 *            properties:
 *             name: 
 *                type: string
 *             description:
 *                 type: string
 *             initDate: 
 *                 type: string
 *                 format: date-time
 *             endDate: 
 *                 type: string
 *                 format: date-time
 *             idealInitDate: 
 *                 type: string
 *                 format: date-time
 *             idealEndDate: 
 *                 type: string
 *                 format: date-time
 *             type:
 *                  type: string
 *                  default: Desarrollo  
 *              
 *    responses:
 *      200:
 *        description: project updated
 *      404:
 *        description: projectNotFound
 */
 router.put("/projects/:id", projectController.updateProject);


/**
 * @swagger
 * /api/projects/{id}/hours:
 *  put:
 *    summary: add work hours of a project
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
 *                      default: 0
 *    responses:
 *      200:
 *        description: add inverted hours
 *      404:
 *        description: hours not added
 */
router.put("/projects/:id/hours", projectController.addInvertedHours)

/**
 * @swagger
 * /api/projects/{id}:
 *  delete:
 *    summary: delete a project by id
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

 /**
 * @swagger
 * /api/projects/{id}/status:
 *  patch:
 *    summary: update a project status
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
 *                  status: 
 *                      type: string
 *                      default: Project-Name                  
 *    responses:
 *      200:
 *        description: project name update
 *      404:
 *        description: project not found
 */
router.patch("/projects/:id/projectName", projectController.updateStatus);

module.exports = router;

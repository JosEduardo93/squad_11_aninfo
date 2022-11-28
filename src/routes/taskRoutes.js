const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          description: task name
 *          default: Task-name
 *        description:
 *          type: string
 *          description: task description
 *          default: Task description
 *        idealInitDate:
 *          type: string
 *          format: date-time
 *          description: task ideal init date
 *        idealEndDate:
 *          type: string
 *          format: date-time
 *          description: task ideal end date
 *        responsible:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: string
 *                      default: idRecurso
 *                  rol:
 *                      type: string
 *                      default: Rol recurso
 *          description: id of person in charge
 *        invertedHours:
 *          type: integer
 *          description: task inverted hours
 *        initDate:
 *          type: string
 *          format: date-time
 *          description: task real init date
 *        endDate:
 *          type: string
 *          format: date-time
 *          description: task real end date
 *        status:
 *          type: string
 *          description: task state
 *        projectID:
 *          type: string
 *          description : project assigned to task
 *          pattern: ([xX])?[0-9a-f]{24}
 */

/**
 * @swagger
 * /api/tasks:
 *  post:
 *    summary: create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *                default: Project-Name
 *              description:
 *                 type: string
 *                 default: Project description
 *              idealInitDate: 
 *                 type: string
 *                 format: date-time
 *              idealEndDate: 
 *                 type: string
 *                 format: date-time
 *              responsible:
 *                 type: array
 *                 default: [{"id": "ddaadd", "rol": "develop"}]
 *              projectID:
 *                 type: string
 *                 pattern: ([xX])?[0-9a-f]{24}
 *    responses:
 *      200:
 *        description: new task created
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#components/schemas/Task' 
 *      404:
 *        description: failed creating task
 */
 router.post("/tasks", taskController.postTask);

/**
 * @swagger
 * /api/tasks:
 *  get:
 *   summary: get all tasks
 *   tags: [Tasks]
 *   responses:
 *      200:
 *        description: tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Task'
 */
router.get("/tasks", taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *    summary: find task by id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        require: true
 *        description: the task id
 *      
 *    responses:
 *      200:
 *          description: a task
 *          content: 
 *            application/json:
 *              type: object
 *              $ref: '#components/schemas/Task'
*/
router.get("/tasks/:id", taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/project/{id}:
 *  get:
 *    summary: find all task associated with a project
 *    tags: [Tasks]
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
 *                  $ref: '#components/schemas/Task'
 *      404:
 *          description: not found project 
*/ 
router.get("/tasks/project/:id", taskController.getTaskByIdProyect);

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *    summary: update a task
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
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
 *             idealInitDate: 
 *                 type: string
 *                 format: date-time
 *             idealEndDate: 
 *                 type: string
 *                 format: date-time 
 *             responsible:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: string
 *                              default: idRecurso
 *                          rol:
 *                              type: string
 *                              default: Rol recurso
 *                      
 *                 
 *    responses:
 *      200:
 *        description: task updated
 *      404:
 *        description: TaskNotFound
 */
 router.put("/tasks/:id", taskController.updateTask);


/**
 * @swagger
 * /api/tasks/{id}/hours:
 *  put:
 *    summary: add work hours to a task
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
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
 *        description: added inverted hours to the task
 *      404:
 *        description: hours not added to the task
 */
router.put("/tasks/:id/hours", taskController.addInvertedHours)

/**
 * @swagger
 * /api/tasks/{id}/status:
 *  patch:
 *    summary: task update status
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *              type: object
 *              properties:
 *                  status: 
 *                      type: string                  
 *    responses:
 *      200:
 *        description: task status updated
 *      404:
 *        description: task not found
 */
router.patch("/tasks/:id/status", taskController.updateStatus);

/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *    summary: delete a task
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *    responses:
 *      200:
 *        description: task deleted
 *      404:
 *        description: task not found
 */
router.delete("/tasks/:id", taskController.deleteById);

module.exports = router;
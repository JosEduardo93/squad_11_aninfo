const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        age:
 *          type: integer
 *          description: the user name
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *        - name
 *        - age
 *        - email
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created!
 */
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: new user created!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
*/
// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: return a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: a user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/User'
 *      404:
 *        description: user not found
 */
// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: user delete
 *      404:
 *        description: user not found
 */
// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: update a user
 *    tags: [User]
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
 *            type: object
 *            $ref: '#components/schemas/User'
 *    responses:
 *      200:
 *        description: user update
 *      404:
 *        description: user not found
 */
// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;

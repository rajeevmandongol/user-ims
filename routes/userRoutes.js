const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);

router.put("/:id", UserController.updateUserById);

router.patch("/:id", UserController.updateUserPartialsById);

router.delete("/:id", UserController.deleteUserById);

module.exports = router;

/*
Below comments are used by Swagger UI
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: The name of the user and should contain only alphabets and spaces
 *         email:
 *           type: string
 *           description: The valid email of the user
 *         phone:
 *           type: string
 *           description: 10 digit mobile number of 7 digit landline number
 *       example:
 *         name: Ram
 *         email: ram@ram.com
 *         phone: 9912345678
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user-ims API
 * /users:
 *   get:
 *     summary: Lists all the Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users found
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Ram
 *                           email:
 *                             type: string
 *                             example: ram@ram.com
 *                           phone:
 *                             type: string
 *                             example: "9912345678"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-09-03T10:15:41.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-09-03T10:15:41.000Z"
 *       204:
 *          description: No users Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: No Users found
 *                  data:
 *                    type: object
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *          description: Bad Request - Missing Fields
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: All fields are required!
 *       409:
 *         description: Returns 409 Conflict if email already exists
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                          example: false
 *                      message:
 *                          type: string
 *                          example: ValidationError
 *                      errors:
 *                          type: array
 *                          items:
 *                           type: object
 *                           properties:
 *                             field:
 *                               type: string
 *                               example: email
 *                             message:
 *                               type: string
 *                               example: Provide a valid email address
 *       500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: Internal Server Error!
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *          description: User Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: User found
 *                  data:
 *                    type: object
 *                    properties:
 *                      user:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                            example: 1
 *                          name:
 *                            type: string
 *                            example: Ram
 *                          email:
 *                            type: string
 *                            example: ram13@ram.com
 *                          phone:
 *                            type: string
 *                            example: "9812345678"
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                            example: "2023-09-03T04:11:15.000Z"
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
 *                            example: "2023-09-03T04:11:15.000Z"
 *       404:
 *          description: User Not Found
 *          content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                          example: false
 *                      message:
 *                          type: string
 *                          example: User not found!
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *         description: User Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Hari
 *                         email:
 *                           type: string
 *                           example: ram1@ram.com
 *                         phone:
 *                           type: string
 *                           example: "9812345699"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-09-03T04:11:15.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-09-03T04:38:55.993Z"
 *      400:
 *          description: Bad Request - Missing Fields
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: All fields are required!
 *      404:
 *        description: User Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: User not found!
 *      500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error!
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *
 *     responses:
 *       200:
 *          description: User Deleted Successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: User deleted successfully!
 *                  data:
 *                    type: object
 *       404:
 *         description: User Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: User not found!
 */

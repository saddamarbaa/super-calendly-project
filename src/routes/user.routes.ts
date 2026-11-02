import { Router } from 'express'

import userController from '../controllers/user.controller.js'

import {
	createUserSchema,
	updateUserSchema,
	userIdSchema,
} from '../validators/user.validator.js'

import {
	validateBody,
	validateParams,
} from '../middlewares/validate.middleware.js'

const router = Router()

// GET /api/users
router.get('/', userController.getAllUsers)

// GET /api/users/:id
router.get('/:id', validateParams(userIdSchema), userController.getUserById)

// POST /api/users
router.post('/', validateBody(createUserSchema), userController.createUser)

// PATCH /api/users/:id
router.patch(
	'/:id',
	validateParams(userIdSchema),
	validateBody(updateUserSchema),
	userController.updateUser,
)

// DELETE /api/users/:id
router.delete('/:id', validateParams(userIdSchema), userController.deleteUser)

export default router

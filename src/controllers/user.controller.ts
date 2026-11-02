import type { Request, Response, NextFunction } from 'express'
import userService, { AppError } from '../services/user.service.js'

// Get and validate the user ID from the request parameters.
function getUserId(req: Request): string {
	const id = req.params.id

	if (typeof id !== 'string') {
		throw new AppError('Invalid user ID.', 400)
	}

	return id
}

class UserController {
	async getAllUsers(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const users = await userService.getAllUsers()

			res.status(200).json({
				success: true,
				count: users.length,
				data: users,
			})
		} catch (error) {
			next(error)
		}
	}

	async getUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = getUserId(req)
			const user = await userService.getUserById(id)

			res.status(200).json({
				success: true,
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const user = await userService.createUser(req.body)

			res.status(201).json({
				success: true,
				message: 'User created successfully.',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}

	async updateUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = getUserId(req)
			const user = await userService.updateUser(id, req.body)

			res.status(200).json({
				success: true,
				message: 'User updated successfully.',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}

	async deleteUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = getUserId(req)
			await userService.deleteUser(id)

			res.status(200).json({
				success: true,
				message: 'User deleted successfully.',
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()

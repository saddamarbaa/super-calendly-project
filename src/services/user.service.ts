import userRepository from '../repositories/user.repository.js'

interface CreateUserInput {
	name?: string
	email: string
}

interface UpdateUserInput {
	name?: string
	email?: string
}

export class AppError extends Error {
	constructor(
		message: string,
		public statusCode: number,
	) {
		super(message)
		this.name = 'AppError'
	}
}

class UserService {
	async getAllUsers() {
		return userRepository.findAll()
	}

	async getUserById(id: string) {
		const user = await userRepository.findById(id)

		if (!user) {
			throw new AppError('User not found.', 404)
		}

		return user
	}

	async createUser(data: CreateUserInput) {
		const existingUser = await userRepository.findByEmail(data.email)

		if (existingUser) {
			throw new AppError('Email is already registered.', 409)
		}

		return userRepository.create(data)
	}

	async updateUser(id: string, data: UpdateUserInput) {
		const existingUser = await userRepository.findById(id)

		if (!existingUser) {
			throw new AppError('User not found.', 404)
		}

		if (data.email) {
			const emailUser = await userRepository.findByEmail(data.email)

			if (emailUser && emailUser.id !== id) {
				throw new AppError('Email is already registered.', 409)
			}
		}

		return userRepository.update(id, data)
	}

	async deleteUser(id: string) {
		const existingUser = await userRepository.findById(id)

		if (!existingUser) {
			throw new AppError('User not found.', 404)
		}

		return userRepository.delete(id)
	}
}

export default new UserService()

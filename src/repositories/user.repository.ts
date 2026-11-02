import prisma from '../config/database.js'

interface CreateUserInput {
	name?: string
	email: string
}

interface UpdateUserInput {
	name?: string
	email?: string
}

class UserRepository {
	// Get all users
	async findAll() {
		return prisma.user.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		})
	}

	// Find user by ID
	async findById(id: string) {
		return prisma.user.findUnique({
			where: { id },
		})
	}

	// Find user by email
	async findByEmail(email: string) {
		return prisma.user.findUnique({
			where: { email },
		})
	}

	// Create user
	async create(data: CreateUserInput) {
		return prisma.user.create({
			data,
		})
	}

	// Update user
	async update(id: string, data: UpdateUserInput) {
		return prisma.user.update({
			where: { id },
			data,
		})
	}

	// Delete user
	async delete(id: string) {
		return prisma.user.delete({
			where: { id },
		})
	}
}

export default new UserRepository()

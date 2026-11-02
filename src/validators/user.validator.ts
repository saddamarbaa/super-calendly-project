import { z } from 'zod'

export const createUserSchema = z.object({
	name: z.string().trim().min(2).optional(),
	email: z.string().trim().email(),
})

export const updateUserSchema = z
	.object({
		name: z.string().trim().min(2).optional(),
		email: z.string().trim().email().optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: 'At least one field is required to update a user.',
	})

export const userIdSchema = z.object({
	id: z.string().uuid(),
})

import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../services/user.service.js'

export function errorHandler(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	console.error('API Error:', error)

	if (res.headersSent) {
		next(error)
		return
	}

	if (error instanceof AppError) {
		res.status(error.statusCode).json({
			success: false,
			message: error.message,
		})
		return
	}

	// Handle Prisma unique constraint errors
	if (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		error.code === 'P2002'
	) {
		res.status(409).json({
			success: false,
			message: 'A record with this value already exists.',
		})
		return
	}

	res.status(500).json({
		success: false,
		message: 'Internal server error.',
	})
}

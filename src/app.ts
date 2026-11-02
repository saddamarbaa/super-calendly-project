import express from 'express'
import prisma from './config/database.js'

import userRoutes from './routes/user.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

// Middleware
app.use(express.json())

// Root endpoint
app.get('/', (req, res) => {
	res.status(200).send('SuperCalendly API is running 🚀')
})

// Application health check
app.get('/health', (req, res) => {
	res.status(200).json({
		status: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	})
})

// Database health check
app.get('/health/db', async (req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`

		res.status(200).json({
			status: 'ok',
			message: 'Database connection is healthy.',
		})
	} catch (error) {
		console.error('Database health check failed:', error)

		res.status(503).json({
			status: 'error',
			message: 'Database connection is unavailable.',
		})
	}
})

// User routes
app.use('/api/users', userRoutes)

// Handle unknown routes
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found.',
	})
})

// Centralized error handler (must be last)
app.use(errorHandler)

export default app

import express from 'express'
import prisma from './config/database.js'

const app = express()

app.get('/', (req, res) => {
	res.send('SuperCalendly API is running 🚀')
})

app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		timeStamp: new Date().toISOString(),
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

export default app

import app from './app.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'
import { PORT } from './config/env.js'

export async function startServer(): Promise<void> {
	try {
		// Connect to PostgreSQL first
		await connectDatabase()

		const server = app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})

		// Handle graceful shutdown
		const shutdown = async (): Promise<void> => {
			console.log('Shutting down server...')

			server.close(async (error) => {
				if (error) {
					console.error('Failed to close server:', error)
					process.exit(1)
				}

				try {
					await disconnectDatabase()
					process.exit(0)
				} catch (error) {
					console.error('Database shutdown failed:', error)
					process.exit(1)
				}
			})
		}

		process.on('SIGINT', shutdown)
		process.on('SIGTERM', shutdown)
	} catch (error) {
		console.error('Failed to start server:', error)
		await disconnectDatabase().catch(() => {})
		process.exit(1)
	}
}

startServer()

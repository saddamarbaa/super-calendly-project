import app from './app.js'
import { PORT } from './config/env.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'

export async function startServer(): Promise<void> {
	try {
		await connectDatabase()

		const server = app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})

		const shutdown = async () => {
			console.log('Shutting down server...')

			server.close(async (error) => {
				if (error) {
					console.error('Server shutdown failed:', error)
					process.exit(1)
					return
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

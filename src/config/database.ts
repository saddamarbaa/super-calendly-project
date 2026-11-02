import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
	throw new Error('DATABASE_URL is not defined in the environment variables.')
}

const adapter = new PrismaPg({
	connectionString,
})

const prisma = new PrismaClient({
	adapter,
})

// Test database connection
export const connectDatabase = async (): Promise<void> => {
	try {
		await prisma.$connect()

		// Verify that PostgreSQL is responding
		await prisma.$queryRaw`SELECT 1`

		console.log('Database connected successfully.')
	} catch (error) {
		console.error('Database connection failed:', error)

		// Close Prisma connection before exiting
		await prisma.$disconnect()

		throw error
	}
}

// Disconnect database gracefully
export const disconnectDatabase = async (): Promise<void> => {
	try {
		await prisma.$disconnect()

		console.log('Database disconnected successfully.')
	} catch (error) {
		console.error('Database disconnection failed:', error)

		throw error
	}
}

export default prisma

// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client/extension'

// export async function connectToDatabase() {
// 	const connectionString = process.env.DATABASE_URL
// 	try {
// 		if (!connectionString) {
// 			throw new Error('DATABASE_URL is missing from .env')
// 		}

// 		// Create PostgreSQL adapter
// 		const adapter = new PrismaPg({
// 			connectionString,
// 		})

// 		// Create Prisma Client
// 		const prisma = new PrismaClient({
// 			adapter,
// 		})

// 		// Test the database connection
// 		await prisma.$queryRaw`SELECT 1`

// 		console.log('Database connection successful!')
// 	} catch (error) {
// 		console.error('Database connection failed:', error)
// 		process.exit(1) // Exit the process with an error code
// 	}
// }

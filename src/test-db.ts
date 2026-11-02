import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

// Get the database connection string
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
	throw new Error('DATABASE_URL is missing from .env')
}

// Create PostgreSQL adapter
const adapter = new PrismaPg({
	connectionString,
})

// Create Prisma Client
const prisma = new PrismaClient({
	adapter,
})

async function testDatabase() {
	try {
		// Execute a test query
		const result = await prisma.$queryRaw`
      SELECT
        current_database() AS database,
        current_user AS user,
        NOW() AS time;
    `

		console.log('Database connection successful!')
		console.log(result)
	} catch (error) {
		console.error('Database connection failed:')
		console.error(error)
	} finally {
		await prisma.$disconnect()
	}
}

testDatabase()

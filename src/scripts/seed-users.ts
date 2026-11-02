import prisma from '../config/database.js'

const users = [
	{
		name: 'John Smith',
		email: 'john@example.com',
	},
	{
		name: 'Sarah Johnson',
		email: 'sarah@example.com',
	},
	{
		name: 'Michael Brown',
		email: 'michael@example.com',
	},
	{
		name: 'Emily Davis',
		email: 'emily@example.com',
	},
	{
		name: 'David Wilson',
		email: 'david@example.com',
	},
]

async function seedUsers(): Promise<void> {
	try {
		const createdUsers = await prisma.user.createMany({
			data: users,
			skipDuplicates: true,
		})

		console.log(`${createdUsers.count} users inserted successfully.`)
	} catch (error) {
		console.error('Failed to insert users:', error)
		process.exitCode = 1
	} finally {
		await prisma.$disconnect()
	}
}

seedUsers()

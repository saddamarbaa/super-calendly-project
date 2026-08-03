import 'dotenv/config'

const env = {
	port: process.env.PORT || 3000,
}

export const PORT = env.port

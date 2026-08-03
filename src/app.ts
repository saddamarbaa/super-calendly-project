import express from 'express'

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

export default app

const app = require('express')()
const cors = require('cors')

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

app.use(cors())

const PORT = process.env.PORT || 5000

app.get('/', (request, response) => {
    response.send('Server running')
})

io.on('connection', (socket) => {
    socket.emit('user', socket.id)

    socket.on('callGuest', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callGuest', { signal: signalData, from, name })
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded')
    })
})

server.listen(PORT, () => console.log('Server listen on port 5000'))

import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer from 'peerjs'

const SocketContext = createContext()

const socket = io('http://localhost:5000')

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [call, setCall] = useState({})
    const [stream, setStream] = useState()
    const [user, setUser] = useState('')
    const [guest, setGuest] = useState('')

    const userVideo = useRef()
    const guestVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream)

            userVideo.current.srcObject = currentStream
        })

        socket.on('user', (id) => setUser(id))

        socket.on('callGuest', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        })
    }, [])

    const callGuest = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('callGuest', { userToCall: id, signal: data, from: user, guest })
        })

        peer.on('stream', (currentStream) => {
            guestVideo.current.srcObject = currentStream
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true)

            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        })

        peer.on('stream', (currentStream) => {
            guestVideo.current.srcObject = currentStream
        })

        peer.signal(call.signal)

        connectionRef.current = peer
    }

    const disconnect = () => {
        setCallEnded(true)

        connectionRef.current.destroy()

        window.location.reload()
    }

    return (
        <SocketContext.Provider value={{
            callAccepted,
            callEnded,
            call,
            stream,
            guest,
            setGuest,
            userVideo,
            guestVideo,
            connectionRef,
            callGuest,
            answerCall,
            disconnect,
        }}>

            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }

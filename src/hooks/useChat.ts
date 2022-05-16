import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

const SERVER_URL = 'http://localhost:3000'

export default (
    roomId: string,
    callback: (msg: string) => void
) => {
    const socketRef = useRef<Socket>()

    useEffect(() => {
        socketRef.current = io(SERVER_URL, { query: { roomId } })
        socketRef.current.on('output', (message) => callback(message))

        return () => {
            if (socketRef.current)
                socketRef.current.disconnect()
        }
    }, [roomId])

    const sendMessage = (message: string) =>
        socketRef.current &&
        socketRef.current.emit('input', message)

    return [sendMessage]
}

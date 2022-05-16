import { nanoid } from "nanoid"
import React, { useEffect, useRef, useState } from "react"
import useChat from "../../hooks/useChat"
import Typewriter from "../typewriter"
import { Input } from "./Input"

interface Message {
    self?: boolean
    message: string
    key: string
}

const MAX_HISTORY_SIZE = 100

export const Wrapper = function () {
    const [history, setHistory] = useState<Message[]>([])
    const divRef = useRef<HTMLDivElement>(null)
    const [roomName] = useState(window.location.pathname)

    console.log(window.location)
    const setHistoryWrapper = (message: string, self?: boolean) => {
        setHistory(history => {
            if (history.length + 1 > MAX_HISTORY_SIZE) {
                const [,...newHistory] = history
                history = newHistory
            }

            return [...history, { message, self, key: nanoid(8) }]
        })
    }

    const [sendMessage] = useChat(roomName, setHistoryWrapper)

    const onSubmitHandler = (message: string) => {
        setHistoryWrapper(message, true)
        sendMessage(message)
    }

    useEffect(() => {
        if (divRef.current)
            divRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    return (
        <main className="wrapper">
            <title>Consolewrite.io</title>
            {history.map((it) => (
                <p key={it.key}>
                    {it.self ? '·': '>'}
                    &nbsp;
                    {it.self ? it.message : <Typewriter content={it.message} speed={100} caretColor="palegreen" />}
                </p>)
            )}
            <Input onSubmit={onSubmitHandler} />
            <div ref={divRef} />
        </main>
    )  
}

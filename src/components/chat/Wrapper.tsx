import React, { useState } from "react"
import useChat from "../../hooks/useChat"
import Typewriter from "../typewriter"
import { Input } from "./Input"

interface Message {
    self?: boolean
    message: string
}

export const Wrapper = function () {
    const [history, setHistory] = useState<Message[]>([])

    const [sendMessage] = useChat(
        'index',
        (message: string) => setHistory(history => [...history, { message }])
    )

    const onSubmitHandler = (message: string) => {
        setHistory(history => [...history, { self: true, message }])
        sendMessage(message)
    }

    return (
        <main className="wrapper">
            <title>Consolewrite.io</title>
            {history.map((it, key) => (
                <p key={key}>
                    {it.self ? '·': '>'}
                    &nbsp;
                    {it.self ? it.message : <Typewriter content={it.message} speed={100} caretColor="palegreen" />}
                </p>)
            )}
            <Input onSubmit={onSubmitHandler} />
        </main>
    )  
}

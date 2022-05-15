import React, { useState } from "react"
import { Input } from "./Input"

export const Wrapper = function () {
    const [history, setHistory] = useState<string[]>([])

    return (
        <main className="wrapper">
            <title>Consolewrite.io</title>
            {history.map((message, key) => <p key={key}>&gt; {message}</p>)}
            <Input onSubmit={(value) => setHistory([...history, value])} />
        </main>
    )  
} 
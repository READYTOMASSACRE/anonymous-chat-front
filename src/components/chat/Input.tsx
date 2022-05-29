import React, { useRef, useState } from 'react'
import { useClickAnyWhere } from 'usehooks-ts'

const submit: Record<string, boolean> = {
    "Enter": true,
    "NumpadEnter": true,
}

interface InputArgs {
    onSubmit: (value: string) => void
}

export const Input = function({ onSubmit }: InputArgs) {
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useClickAnyWhere(() => {
        if (inputRef.current)
            inputRef.current.focus()
    })

    return (
        <pre className="caret-bar">
            <span className="input" onClick={e => inputRef.current && inputRef.current?.focus()}>{input}</span>
            <span className="caret">&nbsp;</span>
            <input
                ref={inputRef}
                autoFocus
                value={input}
                onPaste={e => e.preventDefault()}
                onChange={e => setInput(e.target.value)}
                onKeyUp={e => {
                    if (submit[e.key]) {
                        onSubmit(input)
                        setInput('')
                    }
                }}
                type="text"
                />
        </pre>
    )
}
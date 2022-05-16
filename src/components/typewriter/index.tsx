import React, { useEffect, useState } from 'react'

interface TypeWriterArgs {
    content: string
    speed?: number
    caretColor?: string
}

const rand = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max + 1)

    return Math.floor(Math.random() * (max - min)) + min

}
export default ({
    content,
    speed = 1000,
    caretColor = 'white',
}: TypeWriterArgs) => {
    const [displayedContent, setDisplayedContent] = useState('')
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const write = (current: number) => {
            setTimeout(() => {
                setIndex(index => {
                    if (index >= content.length - 1)
                        return index
                    
                    const next = index + 1
                    current = content[next] === ' ' ? 0 : rand(10, speed)

                    write(current)
                    return next
                })
            }, current)
        }

        write(speed)
    }, [])

    useEffect(() => {
        setDisplayedContent((old) => old + (content[index] ?? ''))
    }, [index])

    const [str, last] = [displayedContent.slice(0, -1), displayedContent.slice(-1)]

    const color = index === content.length -1 ? 'inherit' : caretColor

    return (<>{str}<span style={{ color }}>{last}</span></>)
}
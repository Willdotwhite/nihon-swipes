import React, { useState } from 'react'
import { Deck } from "./components/Deck";

export const Main = () => {

    const testModes = [
        "kanji-meaning",
    ]

    const [testMode, setTestMode] = useState(testModes[0])

    return (
        <>
            <Deck testMode={testMode} />
        </>
    )
}
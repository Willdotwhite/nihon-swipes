import React, { useState } from 'react'
import { Deck } from "./components/Deck";
import { TestModePicker } from "./components/TestModePicker";

export const Main = () => {

    const testModes = [
        {
            id: "kanji-meaning",
            title: "行く ➡ 'To Go'",
        },
        {
            id: "furigana-to-kanji",
            title: "いく ➡ 行く",
        },
        {
            id: "english-to-kanji",
            title: "'To Go' ➡ 行く",
        }
    ]

    const [testMode, setTestMode] = useState(testModes[0])

    return (
        <>
            <TestModePicker testModes={testModes} setTestMode={setTestMode} />
            <Deck testMode={testMode} />
        </>
    )
}
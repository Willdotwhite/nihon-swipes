import React, { useState } from 'react'
import { Deck } from "./components/Deck";
import { TestModePicker } from "./components/TestModePicker";
import { WordTypePicker } from "./components/WordTypePicker";

import { default as adjectives } from "./cards/adjectives";
import { default as verbs } from "./cards/verbs";


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

    const wordTypes = [
        {
            id: "verbs",
            title: "行く"
        },
        {
            id: "adjectives",
            title: "上手"
        }
    ]

    const words = {
        "adjectives": adjectives,
        "verbs": verbs,
    }

    const [testMode, setTestMode] = useState(testModes[0])
    const [wordType, setWordType] = useState(wordTypes[0])

    const cardData = words[wordType.id];

    return (
        <>
            <TestModePicker testModes={testModes} setTestMode={setTestMode} />
            <Deck testMode={testMode} cardData={cardData} />
            <WordTypePicker wordTypes={wordTypes} setWordType={setWordType} />
        </>
    )
}
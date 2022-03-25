import React, { useState } from 'react'
import { Deck } from "./components/Deck";
import { TestModePicker } from "./components/TestModePicker";
import { WordTypePicker } from "./components/WordTypePicker";

import { default as adjectives } from "./cards/adjectives";
import { default as verbs } from "./cards/verbs";
import {CardItem} from "./cards/CardItem";


export const Main = () => {

    const testModes = [
        {
            id: "kanji-meaning", // TODO: rename to jp-meaning or something
            title: "行く ➡ 'To Go'",
            kanjiRequired: false,
        },
        {
            id: "furigana-to-kanji",
            title: "いく ➡ 行く",
            kanjiRequired: true,
        },
        {
            id: "english-to-kanji", // TODO: rename
            title: "'To Go' ➡ 行く",
            kanjiRequired: false,
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
        "adjectives": CardItem.fromArray(adjectives),
        "verbs": CardItem.fromArray(verbs),
    }

    const [testMode, setTestMode] = useState(testModes[0])
    const [wordType, setWordType] = useState(wordTypes[0])

    const cardData = testMode.kanjiRequired
        ? words[wordType.id].filter(word => word.hasKanji())
        : words[wordType.id];

    return (
        <>
            <TestModePicker testModes={testModes} setTestMode={setTestMode} />
            <Deck testMode={testMode} cardData={cardData} />
            <WordTypePicker wordTypes={wordTypes} setWordType={setWordType} />
        </>
    )
}
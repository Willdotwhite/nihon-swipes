import React from 'react'
import {animated, interpolate} from "react-spring";
import { KanjiMeaning } from "./faces/KanjiMeaning";
import { FuriganaToKanji } from "./faces/FuriganaToKanji";

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const cardData = [
    {
        "kanji": "会う",
        "furigana": "あう",
        "romaji": "au",
        "meaning": "to meet"
    },
    {
        "kanji": "遊ぶ",
        "furigana": "あそぶ",
        "romaji": "asobu",
        "meaning": "to play",
    },
    {
        "kanji": "行く",
        "furigana": "いく",
        "romaji": "iki",
        "meaning": "to go",
    },
    {
        "kanji": "売る",
        "furigana": "うる",
        "romaji": "uru",
        "meaning": "to sell",
    }
];

export const Card = ({testMode, handler, rotation, scale}) => {
    const randomInt = Math.floor(Math.random() * cardData.length)
    const randomSide = Math.round(Math.random() * 100) % 2 === 0 ? "left" : "right"
    const card = cardData[randomInt]

    const randomCard = cardData[randomInt + 1 >= cardData.length ? 0 : randomInt + 1]
    console.log("WPW", testMode)

    return (
        <>

            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...handler} style={{ transform: interpolate([rotation, scale], trans) }}>
                <div className="card">
                    {testMode.id === "kanji-meaning" && <KanjiMeaning card={card} randomCard={randomCard} side={randomSide} /> }
                    {testMode.id === "furigana-to-kanji" && <FuriganaToKanji card={card} randomCard={randomCard} side={randomSide} /> }
                </div>
            </animated.div>

        </>
    )
}
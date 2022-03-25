import React from 'react'
import {animated, interpolate} from "react-spring";
import { KanjiMeaning } from "./faces/KanjiMeaning";
import { FuriganaToKanji } from "./faces/FuriganaToKanji";
import { EnglishToKanji } from "./faces/EnglishToKanji";

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const Card = ({testMode, card, randomCard, correctSide, handler, rotation, scale}) => {
    return (
        <>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...handler} style={{ transform: interpolate([rotation, scale], trans) }}>
                <div className="card">
                    {testMode.id === "kanji-meaning" && <KanjiMeaning card={card} randomCard={randomCard} correctSide={correctSide} /> }
                    {testMode.id === "furigana-to-kanji" && <FuriganaToKanji card={card} randomCard={randomCard} correctSide={correctSide} /> }
                    {testMode.id === "english-to-kanji" && <EnglishToKanji card={card} randomCard={randomCard} correctSide={correctSide} /> }
                </div>
            </animated.div>

        </>
    )
}
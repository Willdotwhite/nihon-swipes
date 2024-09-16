import React from 'react'
import { KanjiMeaning } from "./faces/KanjiMeaning";
import { FuriganaToKanji } from "./faces/FuriganaToKanji";
import { EnglishToKanji } from "./faces/EnglishToKanji";


export const Card = ({testMode, card, randomCard, correctSide, showRomaji}) => {
    return (
        <div className="card">
            {testMode.id === "kanji-meaning" && <KanjiMeaning card={card} randomCard={randomCard} correctSide={correctSide} showRomaji={showRomaji} /> }
            {testMode.id === "furigana-to-kanji" && <FuriganaToKanji card={card} randomCard={randomCard} correctSide={correctSide} showRomaji={showRomaji} /> }
            {testMode.id === "english-to-kanji" && <EnglishToKanji card={card} randomCard={randomCard} correctSide={correctSide} showRomaji={showRomaji} /> }
        </div>
    )
}
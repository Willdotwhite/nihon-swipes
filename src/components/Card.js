import React from 'react'
import {animated, interpolate} from "react-spring";

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const cardData = [
    {
        "kanji": "会う",
        "furigana": "あう",
        "romaji": "au",
        "meaning": "to meet"
    }
];

export const Card = ({handler, rotation, scale}) => {
    return (
        <>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...handler} style={{ transform: interpolate([rotation, scale], trans) }}>
                <div className="card">
                    <h1 className="card-main">{cardData[0].kanji}</h1>
                </div>
            </animated.div>
        </>
    )
}
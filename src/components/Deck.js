import React, {useReducer, useState} from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { Card } from "./Card";

const numberOfCards = 10

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const initialScoreState = {score: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'inc':
            return {score: state.score + 1};
        case 'reset':
            return {score: 0};
        default:
            throw new Error();
    }
}
export const Deck = ({testMode, cardData}) => {
    const [score, updateScore] = useReducer(reducer, initialScoreState);

    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(numberOfCards, (i) => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index, correctSide], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

        // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        if (!down && trigger) {
            gone.add(index)
            cardWasSwiped(index, dir === -1 ? "left" : "right", correctSide)
        }

        set((i) => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        if (!down && gone.size === numberOfCards) setTimeout(() => gone.clear() || set((i) => to(i)), 600)
    })

    const cardWasSwiped = (index, dir, correctSide) => {
        const wasCorrect = dir === correctSide
        wasCorrect ? updateScore({type: 'inc'}) : updateScore({type: 'inc'})
        // wasCorrect ? updateScore({type: 'inc'}) : updateScore({type: 'reset'})
        console.log(score)

        if (score % 5 === 0) {
            navigator.vibrate([30])
            console.log(score)
        }

        const classFlashName = wasCorrect ? "correct-flash" : "incorrect-flash"
        document.getElementById("root").classList.add(classFlashName)
        setTimeout(() => document.getElementById("root").classList.remove(classFlashName), 300)
    }

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return props.map(({ x, y, rot, scale }, i) => {
        const randomInt = Math.floor(Math.random() * cardData.length)
        const correctSide = Math.round(Math.random() * 100) % 2 === 0 ? "left" : "right"
        const card = cardData[randomInt]

        const validCardOptions = cardData
            // Don't give correct answer as the random incorrect option
            .filter(c => c.meaning !== card.meaning)
            // If comparing furigana to kanji, ensure the last (normally - always?) hirigana characters match
            .filter(c => testMode.id !== "furigana-to-kanji" || c.furigana.slice(-1) === card.furigana.slice(-1))

        //  Short circuit _some_ nonsense, no idea what
        if (validCardOptions.length === 0) {
            return (<></>)
        }

        const randomCard = validCardOptions[Math.floor(Math.random() * validCardOptions.length)]

        return (
            <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
                <Card testMode={testMode} card={card} randomCard={randomCard} correctSide={correctSide} handler={bind(i, correctSide)} rotation={rot} scale={scale} />
            </animated.div>
        )
    })
}

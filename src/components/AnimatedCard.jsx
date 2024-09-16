import React, {useEffect, useState} from "react";
import {animated, interpolate, useSprings} from "react-spring";
import { Card } from "./Card";
import {useDrag} from "react-use-gesture";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const AnimatedCard = ({cardNumber, testMode, wordType, card, randomCard, correctSide, showRomaji, onSwiped, onAllCardsSwiped}) => {
    // Create the react-spring object that animated the divs in this component
    const [springProps, set] = useSprings(1, () => ({ ...to(cardNumber), from: from(cardNumber) }))
    const cardTransform = springProps[0]

    // Create a gesture handler for dragging a card
    const bind = useDrag(({ args: [card, correctSide], down, delta: [xDelta], _, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        let hasBeenSwiped = false

        // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        if (!down && trigger) {
            hasBeenSwiped = true
            onSwiped(card, dir === -1 ? "left" : "right", correctSide)
        }

        set(() => {
            const x = hasBeenSwiped ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (hasBeenSwiped ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, config: { friction: 50, tension: down ? 800 : hasBeenSwiped ? 200 : 500 } }
        })
    })

    useEffect(() => onAllCardsSwiped && resetPosition(), [onAllCardsSwiped])
    const resetPosition = () => setTimeout(() => set(() => to(cardNumber)), 600)

    return (
        <animated.div key={cardNumber}
                      style={{ willChange: "transform", transform: interpolate([cardTransform.x, cardTransform.y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div {...bind(card, correctSide)} style={{ willChange: "transform", transform: interpolate([cardTransform.rot, cardTransform.scale], trans) }}>
                <Card
                    testMode={testMode}
                    card={card}
                    randomCard={randomCard}
                    correctSide={correctSide}
                    showRomaji={showRomaji}
                />
            </animated.div>
        </animated.div>
    )
}
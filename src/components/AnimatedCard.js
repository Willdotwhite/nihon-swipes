import React, {useState} from "react";
import {animated, interpolate, useSprings} from "react-spring";
import { Card } from "./Card";
import {useDrag} from "react-use-gesture";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const AnimatedCard = ({cardNumber, testMode, card, randomCard, correctSide, showRomaji, onSwiped}) => {
    const [springProps, set] = useSprings(1, () => ({ ...to(cardNumber), from: from(cardNumber) })) // Create a bunch of springs using the helpers above
    const cardTransform = springProps[0]

    const [isSwiped, setIsSwiped] = useState(false)

    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [card, correctSide], down, delta: [xDelta], _, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

        // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        if (!down && trigger && !isSwiped) {
            setIsSwiped(true)

            // Uncommenting this line deals a new hand of cards!
            onSwiped(card, dir === -1 ? "left" : "right", correctSide)
        }

        set(() => {
            const x = isSwiped ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (isSwiped ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, config: { friction: 50, tension: down ? 800 : isSwiped ? 200 : 500 } }
        })
    })

    return (
        <animated.div key={cardNumber}
                      style={{ transform: interpolate([cardTransform.x, cardTransform.y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div {...bind(card, correctSide)} style={{ transform: interpolate([cardTransform.rot, cardTransform.scale], trans) }}>
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
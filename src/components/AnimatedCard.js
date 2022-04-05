import React from "react";
import { animated, interpolate } from "react-spring";
import { Card } from "./Card";

const cardHasChanged = (prevProps, nextProps) => {
    return prevProps.testMode.id === nextProps.testMode.id
        && prevProps.key === nextProps.key;
}

export const AnimatedCard = React.memo(({i, x, y, testMode, card, randomCard, correctSide, handler, rotation, scale, showRomaji}) => {
    return (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <Card testMode={testMode} card={card} randomCard={randomCard} correctSide={correctSide}
                  handler={handler} rotation={rotation} scale={scale} showRomaji={showRomaji}/>
        </animated.div>
    )
}, cardHasChanged);
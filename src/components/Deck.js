import React, {useReducer, useState} from 'react'
import {getBigNumber} from "../helpers/GetBigNumber";
import {AnimatedCard} from "./AnimatedCard";
import {CardItem} from "../cards/CardItem";
import {default as adjectives} from "../cards/adjectives";
import {default as verbs} from "../cards/verbs";

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

function drawCards(testMode, wordType) {
    const words = {
        "adjectives": CardItem.fromArray(adjectives),
        "verbs": CardItem.fromArray(verbs),
    }

    const cardData = testMode.kanjiRequired
        ? words[wordType.id].filter(word => word.hasKanji())
        : words[wordType.id];

    let cards = []

    for (let i = 0; i < 10; i++) {
        const randomInt = Math.floor(Math.random() * cardData.length)
        const correctSide = getBigNumber() % 2 === 0 ? "left" : "right"
        const card = cardData[randomInt]

        const validCardOptions = cardData
            // Don't give correct answer as the random incorrect option
            .filter(c => c.meaning !== card.meaning)
            // If comparing furigana to kanji, ensure the last (normally - always?) hirigana characters match
            .filter(c => testMode.id !== "furigana-to-kanji" || c.furigana.slice(-1) === card.furigana.slice(-1))

        const randomCard = validCardOptions[Math.floor(Math.random() * validCardOptions.length)]
        cards.push({idx: i, correct: card, incorrect: randomCard, side: correctSide})
    }

    return cards
}

export const Deck = ({testMode, wordType, showRomaji}) => {
    console.log(testMode, wordType)

    const [score, updateScore] = useReducer(reducer, initialScoreState);
    const [cards, setCards] = useState(drawCards(testMode, wordType))
    const [swipedCards] = useState([])
    const [onAllCardsSwiped, triggerOnAllCardsSwiped] = useState(() => {})

    const cardWasSwiped = (card, dir, correctSide) => {
        const wasCorrect = dir === correctSide
        wasCorrect ? updateScore({type: 'inc'}) : updateScore({type: 'reset'})

        if (score.score % 5 === 0) {
            window.navigator.vibrate(50)
        }

        // FIXME: Reactify this
        const classFlashName = wasCorrect ? "correct-flash" : "incorrect-flash"
        document.getElementById("root").classList.add(classFlashName)
        setTimeout(() => document.getElementById("root").classList.remove(classFlashName), 300)

        swipedCards.push(card)

        // If all cards swiped
        if (cards.every(item => swipedCards.includes(item.correct))) {
            setCards(drawCards(testMode, wordType))

            // Trigger all AnimatedCards to reset position; leave enough time for message to propagate before resetting
            triggerOnAllCardsSwiped(true)
            setTimeout(() => triggerOnAllCardsSwiped(false), 250)
        }
    }

    console.log(cards)

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return cards.map(i =>
        <AnimatedCard
            key={i.idx}
            cardNumber={i.idx}
            testMode={testMode}
            card={i.correct}
            randomCard={i.incorrect}
            correctSide={i.side}
            showRomaji={showRomaji}
            onSwiped={cardWasSwiped}
            onAllCardsSwiped={onAllCardsSwiped}
        />
    )
}

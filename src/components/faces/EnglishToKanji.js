import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const EnglishToKanji = ({card, randomCard, correctSide}) => {
    return (
        <>
            <Option className="card-option" side="left" text={correctSide === "left" ? card.getKanjiOrFurigana() : randomCard.getKanjiOrFurigana()} />
            <BaseCardFace main={card.meaning} subtitle={null} />
            <Option className="card-option" side="right" text={correctSide === "right" ? card.getKanjiOrFurigana() : randomCard.getKanjiOrFurigana()} />
        </>
    )
}
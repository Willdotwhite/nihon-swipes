import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const EnglishToKanji = ({card, randomCard, side}) => {
    return (
        <>
            <Option className="card-option" side="left" text={side === "left" ? card.getKanjiOrFurigana() : randomCard.getKanjiOrFurigana()} />
            <BaseCardFace main={card.meaning} subtitle={null} />
            <Option className="card-option" side="right" text={side === "right" ? card.getKanjiOrFurigana() : randomCard.getKanjiOrFurigana()} />
        </>
    )
}
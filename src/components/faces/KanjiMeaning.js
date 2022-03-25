import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const KanjiMeaning = ({card, randomCard, side}) => {
    return (
        <>
            <Option className="card-option" side="left" text={side === "left" ? card.meaning : randomCard.meaning} />
            <BaseCardFace main={card.kanji} subtitle={card.furigana} />
            <Option className="card-option" side="right" text={side === "right" ? card.meaning : randomCard.meaning} />
        </>
    )
}
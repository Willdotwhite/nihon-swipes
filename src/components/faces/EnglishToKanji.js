import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const EnglishToKanji = ({card, randomCard, side}) => {
    return (
        <>
            <Option className="card-option" side="left" text={side === "left" ? card.kanji : randomCard.kanji} />
            <BaseCardFace main={card.meaning} subtitle={null} />
            <Option className="card-option" side="right" text={side === "right" ? card.kanji : randomCard.kanji} />
        </>
    )
}
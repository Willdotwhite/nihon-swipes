import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const FuriganaToKanji = ({card, randomCard, side}) => {
    return (
        <>
            <Option className="card-option" side="left" text={side === "left" ? card.kanji : randomCard.kanji} />
            <BaseCardFace main={card.furigana} subtitle={card.romaji} />
            <Option className="card-option" side="right" text={side === "right" ? card.kanji : randomCard.kanji} />
        </>
    )
}
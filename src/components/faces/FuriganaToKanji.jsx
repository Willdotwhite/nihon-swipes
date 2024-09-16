import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const FuriganaToKanji = ({card, randomCard, correctSide, showRomaji}) => {
    return (
        <>
            <Option className="card-option" side="left" text={correctSide === "left" ? card.kanji : randomCard.kanji} />
            <BaseCardFace main={card.furigana} subtitle={showRomaji ? card.romaji : null} />
            <Option className="card-option" side="right" text={correctSide === "right" ? card.kanji : randomCard.kanji} />
        </>
    )
}
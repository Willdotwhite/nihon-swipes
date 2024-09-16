import {BaseCardFace} from "./BaseCardFace";
import {Option} from "../Option";

export const KanjiMeaning = ({card, randomCard, correctSide}) => {
    return (
        <>
            <Option className="card-option" side="left" text={correctSide === "left" ? card.meaning : randomCard.meaning} />
            <BaseCardFace main={card.getKanjiOrFurigana()} subtitle={card.hasKanji() ? card.furigana : ''} />
            <Option className="card-option" side="right" text={correctSide === "right" ? card.meaning : randomCard.meaning} />
        </>
    )
}
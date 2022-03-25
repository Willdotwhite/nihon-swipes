export class CardItem {

    constructor(json) {
        this.kanji = json.kanji
        this.furigana = json.furigana
        this.romaji = json.romaji
        this.meaning = json.meaning
    }

    hasKanji = () => this.kanji !== "-"

    getKanjiOrFurigana = () => this.hasKanji() ? this.kanji : this.furigana

    static fromArray(array) {
        return array.map(json => new CardItem(json))
    }

}
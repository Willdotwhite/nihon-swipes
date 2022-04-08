import React, { useState } from 'react'
import { Deck } from "./components/Deck";
import {TestModePicker, TestModeStorageKey} from "./components/TestModePicker";
import {WordTypePicker, WordTypeStorageKey} from "./components/WordTypePicker";

import { default as testModes } from "./helpers/TestModes";
import { default as wordTypes } from "./helpers/WordTypes";
import {OptionsMenu, RomajiVisibilityStorageKey} from "./components/OptionsMenu";


export const Main = () => {
    const startingTestModeId = localStorage.getItem(TestModeStorageKey) || testModes[0].id
    const [testMode, setTestMode] = useState(testModes.filter(mode => mode.id === startingTestModeId)[0])

    const startingWordTypeId = localStorage.getItem(WordTypeStorageKey) || wordTypes[0].id
    const [wordType, setWordType] = useState(wordTypes.filter(types => types.id === startingWordTypeId)[0])

    const [optionsVisible, toggleOptionsBar] = useState(false)

    const [showRomaji, toggleRomaji] = useState(localStorage.getItem(RomajiVisibilityStorageKey) || false)

    return (
        <>
            <TestModePicker testModes={testModes} testMode={testMode} setTestMode={setTestMode} />
            <Deck testMode={testMode} wordType={wordType} showRomaji={showRomaji} />
            <WordTypePicker wordTypes={wordTypes} wordType={wordType} setWordType={setWordType} toggleOptionsBar={() => toggleOptionsBar(optionsVisible => !optionsVisible)} />
            <OptionsMenu isVisible={optionsVisible} showRomaji={showRomaji} toggleRomaji={toggleRomaji} />
        </>
    )
}
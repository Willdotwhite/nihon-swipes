import React, { useState } from 'react'
import { Deck } from "./components/Deck";
import { TestModePicker } from "./components/TestModePicker";
import { WordTypePicker } from "./components/WordTypePicker";

import { default as testModes } from "./helpers/TestModes";
import { default as wordTypes } from "./helpers/WordTypes";
import {OptionsMenu} from "./components/OptionsMenu";


export const Main = () => {
    const [testMode, setTestMode] = useState(testModes[0])
    const [wordType, setWordType] = useState(wordTypes[0])

    const [optionsVisible, toggleOptionsBar] = useState(false)
    const [showRomaji, toggleRomaji] = useState(true)

    return (
        <>
            <TestModePicker testModes={testModes} testMode={testMode} setTestMode={setTestMode} />
            <Deck testMode={testMode} wordType={wordType} showRomaji={showRomaji} />
            <WordTypePicker wordTypes={wordTypes} wordType={wordType} setWordType={setWordType} toggleOptionsBar={() => toggleOptionsBar(optionsVisible => !optionsVisible)} />
            <OptionsMenu isVisible={optionsVisible} showRomaji={showRomaji} toggleRomaji={toggleRomaji} />
        </>
    )
}
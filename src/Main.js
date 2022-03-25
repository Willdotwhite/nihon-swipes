import React from 'react'
import { Deck } from "./components/Deck";
import { Option } from "./components/Option";

export const Main = () => {
    return (
        <>
            <Option side="left" />
            <Deck />
            <Option side="right" />
        </>
    )
}
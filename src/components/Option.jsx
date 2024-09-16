import React from 'react'

export const Option = ({side, text}) => {

    const styles = {position: "fixed", margin: "20px", textAlign: side}
    styles[side] = "0";

    return (
        <>
            <p className="card-option" style={{...styles, top: "0"}}>{text}</p>
            <p className="card-option" style={{...styles, bottom: "0"}}>{text}</p>
        </>
    )
}
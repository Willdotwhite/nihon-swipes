import React from 'react'

export const Option = ({side, text}) => {

    const styles = {position: "fixed", width: "100%", margin: "20px", "text-align": side}
    styles[side] = "0";

    return (
        <>
            <div style={{
                height: "100%",
                width: "50%",
                position: "fixed",
                left: "0"
            }}>
                <div style={{width: "100%", height: "100%"}}>
                    <p style={{...styles, top: "0"}}>{text}</p>
                    <p style={{...styles, bottom: "0"}}>{text}</p>
                </div>
            </div>
        </>
    )
}
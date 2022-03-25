import React from 'react'

export const Option = ({side}) => {

    const styles = {
        position: "fixed",
        top: "20%",
        zIndex: "10",
        fontSize: "1.5rem"
    }
    styles[side] = "24px"

    return (
        <>
            <p style={styles}>
                to meet</p>
        </>
    )
}
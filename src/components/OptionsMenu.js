export const OptionsMenu = ({isVisible, showRomaji, toggleRomaji}) => {
    console.log(isVisible)
    if (!isVisible) {
        return (<></>)
    }

    return (
        <>
            <div className="options-menu" style={{bottom: 0}}>
                <div className="options-menu-content">
                    <button onClick={() => toggleRomaji(showRomaji => !showRomaji)}>{showRomaji ? "Hide" : "Show"} Romaji</button>
                </div>
            </div>
        </>
    )
}
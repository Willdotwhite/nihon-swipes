export const RomajiVisibilityStorageKey = "shouldShowRomaji"

export const OptionsMenu = ({isVisible, showRomaji, toggleRomaji}) => {
    if (!isVisible) {
        return (<></>)
    }

    const onToggleRomaji = () => {
        localStorage.setItem(RomajiVisibilityStorageKey, !showRomaji)
        console.log("New status", localStorage.getItem(RomajiVisibilityStorageKey))
        toggleRomaji(showRomaji => !showRomaji)
    }

    return (
        <>
            <div className="options-menu" style={{bottom: 0}}>
                <div className="options-menu-content">
                    <button onClick={onToggleRomaji}>{showRomaji ? "Hide" : "Show"} Romaji</button>
                </div>
            </div>
        </>
    )
}
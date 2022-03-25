export const WordTypePicker = ({wordTypes, setWordType}) => {
    return (
        <>
            <div className="player-menu" style={{bottom: 0}}>
                {wordTypes.map(mode => (<button onClick={() => setWordType(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
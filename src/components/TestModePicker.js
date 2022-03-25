export const TestModePicker = ({testModes, setTestMode}) => {
    return (
        <>
            <div className="player-menu">
                {testModes.map(mode => (<button onClick={() => setTestMode(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
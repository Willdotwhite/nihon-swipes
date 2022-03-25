export const TestModePicker = ({testModes, setTestMode}) => {
    return (
        <>
            <div className="test-mode-picker">
                {testModes.map(mode => (<button onClick={() => setTestMode(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
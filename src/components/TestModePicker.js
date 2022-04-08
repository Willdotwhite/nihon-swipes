import { getBigNumber } from "../helpers/GetBigNumber";

export const TestModeStorageKey = "testMode"

export const TestModePicker = ({testModes, testMode, setTestMode}) => {
    const updateTestMode = (mode) => {
        localStorage.setItem(TestModeStorageKey, mode.id)
        setTestMode(mode)
    }

    return (
        <>
            <div className="player-menu">
                {testModes.map(mode => (<button disabled={testMode.id === mode.id} key={getBigNumber()} onClick={() => updateTestMode(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
import { getBigNumber } from "../helpers/GetBigNumber";

export const TestModePicker = ({testModes, testMode, setTestMode}) => {
    return (
        <>
            <div className="player-menu">
                {testModes.map(mode => (<button disabled={testMode.id === mode.id} key={getBigNumber()} onClick={() => setTestMode(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
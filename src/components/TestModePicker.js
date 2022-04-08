import { getBigNumber } from "../helpers/GetBigNumber";

export const TestModePicker = ({testModes, setTestMode}) => {
    return (
        <>
            <div className="player-menu">
                {testModes.map(mode => (<button key={getBigNumber()} onClick={() => setTestMode(mode)}>{mode.title}</button>))}
            </div>
        </>
    )
}
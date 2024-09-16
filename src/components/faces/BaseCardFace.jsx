import { ReactFitty } from "react-fitty";

export const BaseCardFace = ({main, subtitle}) => {
    return (
        <>
            {subtitle && <h2 className="card-subtitle">
                <ReactFitty minSize={16} maxSize={28} wrapText={true}>{subtitle}</ReactFitty>
            </h2>}

            <h1 className="card-main">
                <ReactFitty minSize={28} maxSize={60} wrapText={true}>{main}</ReactFitty>
            </h1>
        </>
    )
}
export const BaseCardFace = ({main, subtitle}) => {
    return (
        <>
            <h2 className="card-subtitle">{subtitle}</h2>
            <h1 className="card-main">{main}</h1>
        </>
    )
}
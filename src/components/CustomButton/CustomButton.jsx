import "./CustomButton.css"

export const CustomButton = ({title, functionEmit, className}) => {

    return(
        <div className={`btn ${className}`} onClick={functionEmit}>{title}</div>
    )
}
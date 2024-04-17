import "./CustomButton.css"

export const CustomButton = ({title, functionEmit, className}) => {

    return(
        <div className={className} onClick={functionEmit}>{title}</div>
    )
}
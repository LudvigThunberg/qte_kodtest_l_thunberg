import "../scss/ErrorMessage.scss"

interface IErrorMerssageProps{
    resetErrorMessage(): void
    error: boolean
}

export const ErrorMessage = (props: IErrorMerssageProps) => {

    const handleCloseError = () => {
        props.resetErrorMessage()
    }

    let errorMessage = 
    <div className="errorMessage">
        <div className="snackbarTextbox">
            <h3>Error</h3>
            <p>Please reload page and try again</p>
        </div>
        <button className="errorButton" onClick={handleCloseError}>X</button>
    </div>

    return(
        <div>
            {props.error && errorMessage}
        </div>
    )
}
export default function SubmitButton(props) {

    function wasDisabled() {
        return props.disabled != null ? props.disabled : false
    }

    function getBackgroundColor() {
        if (!wasDisabled()) {
            return "bg-sky-800 hover:bg-sky-500"
        } else {
            return "bg-gray-400/75"
        }
    }

    return (
        <>
            <button 
                disabled={wasDisabled()} 
                className={" sm:rounded-lg w-16 mt-3 " + getBackgroundColor()} 
                onClick={props.onClickFunction}>{props.text}
            </button>
        </>
    )
}
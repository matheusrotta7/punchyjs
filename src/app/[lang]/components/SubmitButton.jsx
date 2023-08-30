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

    function getWidth() {
        if (props.width != null && props.width != undefined) {
            return props.width
        } else {
            return "w-16"
        }
    }

    return (
        <>
            <button 
                disabled={wasDisabled()} 
                className={" sm:rounded-lg mt-3 " + getWidth() + " " + getBackgroundColor()} 
                onClick={props.onClickFunction}>{props.text}
            </button>
        </>
    )
}
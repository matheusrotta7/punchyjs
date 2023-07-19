export default function SubmitButton(props) {
    return (
        <>
            <button className="bg-sky-800 sm:rounded-lg w-16 mt-3 hover:bg-sky-500" onClick={props.onClickFunction}>{props.text}</button>
        </>
    )
}
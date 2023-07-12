import LittlePunchCircle from "./LittlePunchCircle";


export default function DateBox (props) {
    return (
        <div className="relative bg-gray-300 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="absolute left-0 top-0 text-black/50">{props.day}</div>
            <div className="absolute right-0 bottom-0 flex">
                
                <LittlePunchCircle/>
                <LittlePunchCircle/>
                <LittlePunchCircle/>
                <LittlePunchCircle/>
            </div>
        </div>
    )
}
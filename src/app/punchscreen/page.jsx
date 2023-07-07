
function DateBox (props) {
    return (
        <div className="relative bg-gray-300 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="absolute right-0 bottom-0 ">{getPunches()}</div>
            <div className="absolute left-0 top-0 ">{props.day}</div>
        </div>
    )
}

function getPunches() {
    var result = []
    for (let i = 0; i < 4; i++) {
        result.push(
        <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
      )
    }

    return result;
}

function arrayOfDateBoxes() {

    var result = []
    for (let i = 0; i <= 30; i++) {
        result.push(<DateBox />)
    }

    return result;
}

export default function punchScreen() {



    return (

        <>
            <h1 className="text-red-600">Punch Screen</h1>
            <span className="inline-grid grid-cols-7 gap-4">
                <DateBox 
                    text="punches"
                    day={1}
                />
            </span>
        </>
    )

}
import DateBox from "../components/DateBox";


function arrayOfDateBoxes() {

    var result = []
    for (let i = 1; i<=30; i++) {
        result.push(<DateBox 
            key={i}
            day={i}
            ></DateBox>)
    }

    return result;
}

export default function punchScreen() {



    return (

        <>
            <h1 className="text-gray-200">Punch Screen</h1>
            <span className="inline-grid grid-cols-7 gap-4">
                {arrayOfDateBoxes()}
            </span>
        </>
    )

}
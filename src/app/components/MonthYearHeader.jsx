import dateUtils from "../utils/DateUtils";



export default function MonthYearHeader (props) {
    console.log("Inside MonthYear month: " + props.month)
    return (
        <h2 className="w-32 text-center">{dateUtils.getMonthName(props.month)}  {props.year} </h2>
    )
}
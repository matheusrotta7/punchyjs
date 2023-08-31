import dateUtils from "../utils/DateUtils";



export default function MonthYearHeader (props) {
    return (
        <h2 className="w-32 text-center">{dateUtils.getMonthName(props.month, props.dict)}  {props.year} </h2>
    )
}
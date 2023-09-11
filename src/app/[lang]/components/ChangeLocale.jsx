import ReactCountryFlag from "react-country-flag";


export default function ChangeLocale(props) {

    function changeLocale(newLocale) {
        props.setLocale(newLocale)
    }

    return (
        <div className="p-2 flex ">
            <button onClick={() => changeLocale("pt")}>
                <ReactCountryFlag
                    
                    countryCode="BR" 
                    className="emojiFlag"
                    style={{
                        fontSize: '2em',
                        lineHeight: '2em',
                    }}
                /> <span className="text-lg mx-1"> / </span> 
            </button>
            <button onClick={() => changeLocale("en")}>
                <ReactCountryFlag
                    
                    countryCode="US" 
                    className="emojiFlag"
                    style={{
                        fontSize: '2em',
                        lineHeight: '2em',
                    }}
                />
            </button>
        </div>
    )
}
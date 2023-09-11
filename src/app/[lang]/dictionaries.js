import ptjson from '../dictionaries/pt.json' assert {type: 'json'};
import enjson from '../dictionaries/en.json' assert {type: 'json'};




 
export  function getDictionary(locale) {
    console.log("locale")
    console.log(locale)
    if (locale === "pt") {
        return ptjson
    } else if (locale === "en") {
        return enjson
    }
}
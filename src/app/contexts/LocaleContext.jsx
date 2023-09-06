'use client'

import { createContext, useEffect, useState } from "react";


export const LocaleContext = createContext({})

export default function LocaleProvider({children}) {

    const [locale, setLocale] = useState("pt")
    
    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    )

}
'use client'

import Image from 'next/image'
import { useState, useEffect, useContext } from "react";
import { getDictionary } from '@/app/dictionaries';
import { AuthContext } from "@/app/contexts/AuthContext";


export default function landingscreen() {

    const [dict, setDict] = useState()
    const { locale } = useContext(AuthContext)

    useEffect(() => {
        setDict(getDictionary(locale))  
    }, [])

    return (
        <>
            {dict != undefined && dict != null ? 
                <div className='p-3'>
                <h1 className="text-3xl">{dict.landingscreen.welcometopunchy}</h1>
                <h2 className="mt-3 text-xl">{dict.landingscreen.punchysummary}</h2>

                <h3 className='mt-6 text-xl'>{dict.landingscreen.employeefeatures}</h3>
                <Image className='mt-3 text-xl'
                    src="/punchyemployeemirror.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>{dict.landingscreen.managerfeatures}</h3>
                <Image className='mt-3 text-xl'
                    src="/managerscreenpunchy.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>{dict.landingscreen.adminfeatures}</h3>
                <Image className='mt-3 text-xl'
                    src="/adminscreenpunchy.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>{dict.landingscreen.getintouch}</h3>
                <h4 className='mt-3 text-xl'>E-mail: support@punchy.app</h4>
            </div>
            :
            <></>
            }
            

        
        </>
    )
}
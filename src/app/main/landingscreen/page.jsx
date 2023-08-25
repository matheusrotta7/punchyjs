'use client'

import Image from 'next/image'


export default function landingscreen() {

    return (
        <>
            <div className='p-3'>
                <h1 className="text-3xl">Welcome to Punchy!</h1>
                <h2 className="mt-3 text-xl">Punchy is a digital punch in system that organizes your company's punch-in/out workflow!</h2>

                <h3 className='mt-6 text-xl'>Your employees can easily punch-in, view and ask for alterations in their punches:</h3>
                <Image className='mt-3 text-xl'
                    src="/punchyemployeemirror.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>Your managers can accept or deny punch alteration requests:</h3>
                <Image className='mt-3 text-xl'
                    src="/managerscreenpunchy.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>Your admins can enroll new employees and managers, as well as generate detailed punch reports for each employee and specific month</h3>
                <Image className='mt-3 text-xl'
                    src="/adminscreenpunchy.png"
                    width={1200}
                    height={500}
                    alt="Picture of the author"
                />

                <h3 className='mt-10 text-xl'>Get in touch with our sales team now and learn more!</h3>
            </div>

        
        </>
    )
}
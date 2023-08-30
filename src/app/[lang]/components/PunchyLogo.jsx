

import Image from 'next/image'

export default function PunchyLogo() {

    return (
        <>
            <div className="flex flex-col justify-center items-center mb-5 border-b-2  border-zinc-700">
                <Image className='mt-3 text-xl'
                    src="/punchycirclelogo.png"
                    width={90}
                    height={90}
                    alt="Picture of the author"
                />
                <div>
                    <span className="mt-3 text-zinc-900">..</span>
                </div>

            </div>
        </>
    )
}
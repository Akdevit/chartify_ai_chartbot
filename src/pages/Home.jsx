import React, { useState } from 'react'
import Sidebaar from '../components/layout/Sidebaar'
import Gpt from '../components/layout/Gpt'
const Home = () => {
    const [hidesidebar, setHidesidebar] = useState(true)
    const hidesidebarclick = () => {
        setHidesidebar(false)
    }
    const showsidebarclick = () => {
        setHidesidebar(true)
    }


    return (
        <>
            <div className='w-ful h-[100vh] bg-gray-50 flex'>
                {
                    hidesidebar && (

                        <Sidebaar hidesidebarclick={hidesidebarclick} />
                    )
                }
                <Gpt showsidebarclick={showsidebarclick} hidesidebar={hidesidebar} />
            </div>

        </>
    )
}

export default Home

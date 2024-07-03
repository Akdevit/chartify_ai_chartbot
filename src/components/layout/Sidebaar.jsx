import React, { useState, useEffect } from 'react';
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useUser } from '@clerk/clerk-react';
import Icon from "../../images/icon.svg";

const Sidebaar = ({ hidesidebarclick }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const user = useUser();
    const userim = user?.user;

    // Function to check screen size and update sidebar visibility
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) { // Adjust breakpoint as needed
            setSidebarVisible(false);
        } else {
            setSidebarVisible(true);
        }
    };

    // Add event listener to handle screen size changes
    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {isSidebarVisible && ( // Conditionally render based on state
                <div className='xl:w-[20%] lg:w-[30%] md:w-[40%]   xl:relative xl:z-0 lg:relative lg:z-0 md:relative md:z-0   w-[45%] h-[100vh] bg-[#171717] flex flex-col justify-between  absolute z-10'>
                    <div className='w-[100%]  h-[50px] flex justify-between items-center pl-2 pr-2'>
                        <div onClick={hidesidebarclick} className='w-[40px] h-[40px] bg-gray-600 rounded-full flex justify-center items-center cursor-pointer'> <BsFillGrid1X2Fill className='text-gray-200' /></div>
                    </div>

                    <div className='w-[100%]  h-[50px]  flex gap-4 items-center pl-2'>
                        <div className='w-[40px] h-[40px] rounded-full bg-gray-700 overflow-hidden cursor-pointer'>
                            <img className='w-[100%] h-[100%] object-cover' src={userim?.imageUrl || Icon} alt='user.jpg' />
                        </div>
                        <p className='text-white'>{userim ? userim?.fullName : 'Chartify'}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebaar;

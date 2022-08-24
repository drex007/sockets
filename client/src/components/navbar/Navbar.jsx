import React, { useState, useEffect } from 'react'
import { BsFillBellFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'


const Navbar = ({ socket }) => {
    const [notifications, setNotifications] = useState([])
    const [clickNotification, setClickNotification] = useState(false)

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications((prev) => [...prev, data])
        });

    }, [socket])

    const disifplayNotification = ({ senderName, type }) => {
        let action;
        if (type === 1) {
            action = "liked"
        } else if (type === 2) {
            action = 'commeneted'
        } else {
            action = "shared"
        } return (
            <span className='text-[10px]'>{`${senderName} ${action} your post \n`}</span>
        )

    }
    return (
        <div className='pl-1  pt-3 flex justify-between space-x-3  h-[50px] bg-blue-400 w-full '>
            <h5 className='text-white pl-2 font-semibold'>Notification App</h5>
            <div className='flex space-x-2 justify-between'>
                <div className='flex'>
                    <BsFillBellFill color="white" className='hover:cursor-pointer' size={30}
                        onClick={() => setClickNotification(!clickNotification)}
                    />
                    <p className='bg-red-600 px-2 mb-2 mt-2 hover:cursor-pointer text-sm rounded-full text-white z-2 ml-[-10px]'
                        onClick={() => setClickNotification(!clickNotification)}

                    >{notifications.length}

                    </p>
                </div>
                <div className='flex pr-4'>
                    <AiOutlineMail color='white' size={30} className='mr-2' />
                    <p className='bg-red-600 px-2 mb-2 mt-2   text-sm rounded-full text-white z-2 ml-[-20px]'>2</p>
                </div>

                {clickNotification &&
                    <div className='relative top-12 right-2 flex flex-col bg-white border rounded-sm h-[100px] z-20'>
                        {notifications?.map((n) => (
                            disifplayNotification(n)
                        ))}
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'

const Card = ({ post, user, socket}) => {
  const [liked, setLiked] = useState(false)

  const handleNotification = (type) =>{
    setLiked(true)
    socket.emit("sendNotification",{
      senderName:user,
      receiverName:post.username,
      type: 1
    } )
  }
  return (
    <div className='w-full mb-4 px-2'>
      <div className='flex space-x-2 justify-start my-2 '>
        <img src={post?.userImg} alt="" className='w-[30px] h-[30px] rounded-full' />
        <span className='pt-1'>{post?.fullname}</span>
      </div>
      <img src={post?.postImg} alt="" className='w-full  h-[200px]' />
      <div className='flex space-x-2 mt-2'>
        {liked ? <AiFillHeart size={30} className='hover:cursor-pointer' color='red'
          onClick={() => setLiked(false)}

        /> : <AiOutlineHeart size={30} className='hover:cursor-pointer'
          onClick={() => handleNotification(1)}

        />}
        <BiComment size={30} />

      </div>
    </div>
  )
}

export default Card
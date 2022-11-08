import React from 'react'
import AvatarImage from '../../../../assets/SongHomePage/Avatar.svg'

const Avatar = ({status}) => {
  return (
    <div>
      <div className={`${status==='y'&&'bg-yellow'} ${status==='r'&&'bg-red'} ${status==='g'&&'bg-green'} flex items-end justify-center overflow-hidden h-[13rem] w-[13rem] border border-gray rounded-full`}>
        <img className='h-[13rem]' src={AvatarImage} alt="" />
      </div>
    </div>
  )
}

export default Avatar
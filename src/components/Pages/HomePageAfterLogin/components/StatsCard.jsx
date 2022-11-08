import React from 'react'
import plus from '../../../../assets/SongHomePage/plus.svg'
import plusdark from '../../../../assets/SongHomePage/plusdark.svg'
import coverphoto from '../../../../assets/SongHomePage/coverphoto.svg'

export const StatsCard = ({dark}) => {
  return (
      <div className={`h-[10rem] w-[7.8rem] border ${dark?'border-gray' :'border-white'}`}></div>
  )
}

export const StatsImgCard = ({dark, shake,handleEffectRemove,id}) => {
  return (
      <img onClick={()=>handleEffectRemove(id)} src={coverphoto} className={`h-[10rem] ${shake && 'statsimgcard'}  border ${dark?'border-gray' :'border-white'}`}></img>
  )
}


export const StatsCardAdd = ({dark}) => {
  return (
    <div className={`h-[10rem] w-[7.8rem] border ${dark?'border-gray':'border-white'} flex items-center justify-center`}>
        <img src={dark?plusdark:plus} className={`${dark?'w-[4rem]':''}`} alt='plus' />
    </div>
  )
}


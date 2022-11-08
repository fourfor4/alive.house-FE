import React from 'react'
import coverphoto from '../../../../assets/SongHomePage/coverphoto.svg'
import { EffectsContext } from '../Context/Context';
import CardPopup from './CardPopup';

const LibraryCard = ({status,id}) => {
  const {handleEffectAdd} = React.useContext(EffectsContext);
  const [showInfo, setShowInfo] = React.useState(false);


  let timeout;

  const handleMouseOut = ()=>{
    timeout = setTimeout(()=>{
      setShowInfo(false)
    },50)
  }
  const handleMouseOut2 = ()=>{
    setShowInfo(false)
  }

  const handleBoxMouseEnter = ()=>{
    clearTimeout(timeout)
    setShowInfo(true)
  }

  const handleCardClick = (e)=>{
    handleEffectAdd(id)
    console.log(e.nativeEvent.which)
  }

  return (
   <div  >
     <div className='relative w-[15rem]'>
      <img onClick={handleCardClick} onContextMenu={(e)=>{e.preventDefault();clearTimeout(timeout); setShowInfo(true)}} src={coverphoto} onMouseEnter={()=>{}} onMouseLeave={handleMouseOut} className='w-[15rem]'/>
      <div className='librarycardafter1holder flex items-center justify-center bg-gray absolute top-[0] right-[-10px]'>
          <div className={`librarycardafter1 ${status==='ig' && 'bg-green'} ${status==='y' && 'bg-yellow'} ${status==='r' && 'bg-red'}`}>

          </div>
      </div>
      <div className='librarycardafter2holder absolute bottom-[-10px]'>
      </div>
       <div className={`absolute h-[10rem] ${showInfo?'scale-1':'scale-0'} transition-all duration-300 bottom-[-75px] right-[-50px]`}>
       {showInfo &&<div className='h-[10rem]'>
          
        <div onMouseEnter={handleBoxMouseEnter} onMouseLeave={handleMouseOut2} className='border-b active:bg-green border-l border-r border-t border-gray h-[5rem] w-[12rem] transition-all hover:bg-yellow bg-white flex items-center justify-center'>
          <p style={{fontFamily:'Nuform Sans'}} className='text-[20px] text-gray'>select</p>
        </div>
        <div onClick={()=>{}} onMouseEnter={handleBoxMouseEnter} onMouseLeave={handleMouseOut2} >
          <CardPopup alimg={coverphoto} setShowInfo={setShowInfo}/>
        </div>
        </div>}
        </div>
    </div>


   </div>
  )
}

export default LibraryCard
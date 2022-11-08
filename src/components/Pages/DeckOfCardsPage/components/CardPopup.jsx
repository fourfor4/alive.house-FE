import React from 'react'
import Popup from 'reactjs-popup';
import closeimg from '../../../../assets/SongHomePage/Close_Stroke2.svg'
import album from '../../../../assets/SongHomePage/albumPhoto.svg'
import { motion } from 'framer-motion';

const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
  <button  style={{fontFamily:'Nuform Sans'}} className="border active:bg-green text-gray border-gray text-[20px] h-[5rem] w-[12rem] bg-white hover:bg-yellow transition-all flex items-center justify-center" ref={ref} {...props}>
    info
  </button>
));



const CardPopup = ({setShowInfo:cardinfo, alimg}) => {
  return (
    <Popup onClose={()=>cardinfo(false)}  onClick={()=>{console.log('first')}}
    trigger={open=><CustomButton open={open} />}
    modal
   
  >
    {close => (
      
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      >
      <div className="bg-white border border-gray opacity-100 h-[30rem] flex w-[55rem]">
        <div className=''>
          <div className='ml-[4rem] mt-[1rem] w-[48rem] flex justify-between'>
          <p style={{fontFamily:'Nuform Sans'}} className=' text-gray text-[48px]'>Title</p>
          <motion.div transition={{ duration: 0.2 }}
          initial={{ x:10, y:10 }}
          animate={{ x:10, y:10 }}>
          <img src={closeimg} onClick={()=>close()} className='w-[4rem]' alt='close button'/>
          </motion.div>
          </div>
          <div className='ml-[4rem]  mt-[1rem] flex items-center justify-between '>
            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{scale:1.1}}>
            <img src={alimg} alt="album art" className='h-[18rem]' />
            </motion.div>
            <p style={{fontFamily:'Nuform Sans'}} className='text-[16px] text-gray w-[30rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
      </div>
      <div className='h-[5rem] w-[55rem] bg-green border-r border-l border-b border-gray'>
      </div>
      </motion.div>

    )}
  </Popup>
  )
}

export default CardPopup
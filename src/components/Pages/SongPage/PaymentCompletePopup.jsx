import React from 'react'
import close from '../../../assets/SongHomePage/Close_Stroke.svg'

const PaymentCompletePopup = () => {
  return (
    <div className='fixed top-[0] z-[1000]'>

    <div className='flex  bg-gray opacity-[0.95] items-center justify-center h-[100vh] w-[100vw]'>
    
    </div>
    <div className='fixed top-[30%] right-[35%] flex flex-col justify-center w-[50rem] h-[30rem] bg-white border border-gray'>
      <div className='absolute top-[2%] right-[2%] justify-end'>
        <img src={close} alt="close icon" className='w-[3rem]' />
      </div>
      <div className='w-[50rem] items-center  justify-center flex flex-col'>
        <p style={{fontFamily:'Nuform Sans'}} className='w-[40rem] text-gray mt-[2rem] text-center leading-[1.2] text-[26px]'>
        thank you for purchasing a.live edition
        </p>
        <p style={{fontFamily:'Nuform Sans'}} className='w-[40rem] text-gray mt-[2rem] text-center leading-[1.2] text-[20px]'>
        you can see it in ‘your collection’ section of the website.<br/>
            please find your purchase agreement <span className='text-green'>here</span>
        </p>
        <div className='flex mt-[2rem] gap-[3rem]'>
        <button
              onClick={() => changCookieState(false)}
              style={{ fontFamily: "Nuform Sans" }}
              className=" text-[18px] text-gray w-[10rem] h-[5rem] bg-yellow border border-gray"
            >
              close
            </button>
       

        </div>
      </div>
    </div>      
    </div>
  )
}

export default PaymentCompletePopup
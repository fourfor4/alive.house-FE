import React from "react";
import bell from "../../../../assets/SongHomePage/jointheparty.svg";
import right from "../../../../assets/SongHomePage/buttonarrowright.svg";
import { setShowPopup } from "../../../../globalStates/Home";

export const JoinThePartyButton = () => {
  return (
    <button
      className="flex h-[6rem] mt-[4rem] w-[40.3rem]"
      onClick={() => setShowPopup(true)}
    >
      <div className="h-[6rem] w-[6.1rem] flex items-center justify-center border border-gray">
      <img src={bell} className="h-[4.2rem]" />
      </div>
      <div
        style={{
          fontFamily: "Nuform Sans",
          fontWeight: "900",
        }}
        className={
          "transition-all duration-300 w-[250px] text-[30px] border-y border-r border-gray  text-gray bg-yellow h-[6rem] flex items-center justify-center"
        }
      >
        join the party
      </div>
    </button>
  );
};

// export const EnterEmailButton = () => {
//   return (
//     <button className="flex h-[6rem] mt-[4rem]">
//                 <div
//                   style={{
//                     fontFamily: "Nuform Sans",
//                     fontWeight: "900",
//                   }}
//                   className="w-[33.5rem] text-[16px] border border-gray items-start text-gray bg-yellow h-[6.8rem] flex flex-col justify-center"
//                 >
//                  <p className='ml-[1.5rem] mt-[-4px]'>
//                  enter email ID to get notified
//                  </p>
//                  <input className='w-[30rem] bg-white ml-[1.5rem] border border-gray rounded-none mt-[2px] pl-[2rem] pb-[2px]' placeholder='enter your email'/>
//                 </div>
//                 <div className='w-[6.8rem] flex items-center justify-center h-[6.8rem] border-y border-r border-gray bg-green'>
//                   <img src={right}/>
//                 </div>
//               </button>
//   )
// }
//---------------------------------------------------------------------

{
  /* <button onClick={()=>clicked===false && setClicked(!clicked)} className="flex h-[6rem] mt-[4rem] w-[40.3rem]">
                {clicked===false && <img src={bell} className="h-[6.1rem]" />}
                <div
                  style={{
                    fontFamily: "Nuform Sans",
                    fontWeight: "900",
                  }}
                  className={`transition-all duration-300 ${clicked===false ?'w-[250px] text-[30px] border-y border-r border-gray  text-gray bg-yellow h-[6rem] flex items-center justify-center':'w-[33.5rem] text-[16px] border border-gray items-start text-gray bg-yellow h-[6.8rem] flex flex-col justify-center'}`}
                >
                  {clicked===false && 'get notified'}
                  {clicked===true && <>
                    <p className={` ml-[1.5rem] mt-[-4px]`}>
                 enter email ID to get notified
                 </p>
                 <input className='w-[30rem] bg-white ml-[1.5rem] border border-gray rounded-none mt-[2px] pl-[2rem] pb-[2px]' placeholder='enter your email'/>

                </>}
                </div>
                <button onClick={()=>{setClicked(false)}} className={`w-[6.8rem] ${clicked?'opacity-100':'opacity-0'} transition-all duration-300 flex items-center justify-center h-[6.8rem] border-y border-r border-gray bg-green`}>
                  <img src={right}/>
                </button>
              </button> */
}

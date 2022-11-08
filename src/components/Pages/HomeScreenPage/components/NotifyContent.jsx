import React from 'react'
import bell from "../../../../assets/SongHomePage/Notification_Boxed.png";
import FlipNumbers from 'react-flip-numbers';
const NotifyContent = ({days, hours, seconds}) => {

  

  return (
    <div>
      <div className="mt-[2rem]">
              <div className="flex  w-[32rem] justify-between">
                <div
                  className="text-[24px]"
                  style={{
                    fontFamily: "Nuform Sans",
                    fontWeight: "900",
                    color: "rgba(36, 36, 48, 0.25)",
                  }}
                >
                  days
                </div>
                <div
                  className="text-[24px]"
                  style={{
                    fontFamily: "Nuform Sans",
                    fontWeight: "900",
                    color: "rgba(36, 36, 48, 0.25)",
                  }}
                >
                  hours
                </div>
                <div
                  className="text-[24px]"
                  style={{
                    fontFamily: "Nuform Sans",
                    fontWeight: "900",
                    color: "rgba(36, 36, 48, 0.25)",
                  }}
                >
                  minutes
                </div>
              </div>
              <div className="flex  w-[36rem] h-[12rem] justify-between border border-black">
                <div className="flex justify-center w-1/3 border-r overflow-hidden border-black ">
                  <div
                    className="text-[95px] mt-[-2rem] text-green"
                    style={{
                      fontFamily: "Nuform Sans",
                      fontWeight: "900",
                      // color: "#53e1ad",
                    }}
                  >
                     <FlipNumbers height={140} width={50} numberStyle={{fontSize:'52px', fontWeight:'900'}}  color="#53e1ad" play numbers={`${days}`} />
                  </div>
                </div>
                <div className="flex justify-center w-1/3 border-r border-black ">
                  <div
                    className="text-[95px] mt-[-2rem] text-green"
                    style={{
                      fontFamily: "Nuform Sans",
                      fontWeight: "900",
                      // color: "#53e1ad",
                    }}
                  >
                     <FlipNumbers height={140} width={50} numberStyle={{fontSize:'52px', fontWeight:'900'}}  color="#53e1ad" play numbers={`${hours}`} />
                  </div>
                </div>
                <div className="w-1/3 flex justify-center border-l border-black">
                  <div
                    className="text-[95px] mt-[-2rem] text-green "
                    style={{
                      fontFamily: "Nuform Sans",
                      fontWeight: "900",
                      // color: "#53e1ad",
                    }}
                  >
                     <FlipNumbers height={140} width={50} numberStyle={{fontSize:'52px', fontWeight:'900'}}  color="#53e1ad" play numbers={`${seconds}`} />
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default NotifyContent
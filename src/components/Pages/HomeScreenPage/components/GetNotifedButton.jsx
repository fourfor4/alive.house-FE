import React from "react";
import bell from "../../../../assets/SongHomePage/Notification_Boxed.png";
import right from "../../../../assets/SongHomePage/buttonarrowright.svg";
import { setShowPopup } from "../../../../globalStates/Home";
import { serviceWithAuth } from "../../../../hooks/useService";
import { useState } from "react";
import { setErrorMessage, setInfoMessage } from "../../../../hooks/useErrors";
import InfoModal from "../../../../Modals/InfoModal";
import ErrorModal from "../../../../Modals/ErrorModal";
import close from "../../../../assets/SongHomePage/Close_Stroke.svg";

export const GetNotifedButton = ({ setLaylo }) => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const addSubscriber = ({}) => {
    setClicked(false);

    if (validateEmail(email)) {
      try {
        let service = serviceWithAuth("song-launch/addSubscriber");
        service.put({
          data: {
            songLaunchId: 1,
            email,
          },
        });
      } catch (err) {
        setErrorMessage({
          title: "Something went wrong",
          message: err.message,
        });
        return;
      }
    } else {
      setErrorMessage({
        title: "Invalid Email",
        message: "Please enter a valid email address",
      });
      return;
    }
    setInfoMessage({
      title: "Email registered",
      message: "You will be notified 15 min before the launch.",
    });
  };

  return (
    <>
      <InfoModal />
      <ErrorModal />
      {
        <button
          onClick={() => {
            setLaylo(true);
          }}
          className="flex h-[6rem]"
        >
          <img src={bell} className="h-[6.1rem]" />
          <div
            style={{
              fontFamily: "Nuform Sans",
              fontWeight: "900",
            }}
            className="w-[250px] text-[30px] border-y border-r border-gray  text-gray bg-yellow h-[6rem] flex items-center justify-center"
          >
            get notified
          </div>
          {/* <button className="w-[6.8rem] transition-all duration-300 flex items-center justify-center h-[6.8rem] border-y border-r border-gray bg-green opacity-0">
            <img src={right} />
          </button> */}
        </button>
      }
    </>
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

// {
//   <button
//     onClick={() => clicked === false && setClicked(!clicked)}
//     className="flex h-[6rem] mt-[4rem] w-[40.3rem]"
//   >
//     {clicked === false && <img src={bell} className="h-[6.1rem]" />}
//     <div
//       style={{
//         fontFamily: "Nuform Sans",
//         fontWeight: "900",
//       }}
//       className={`transition-all duration-300 ${
//         clicked === false
//           ? "w-[250px] text-[30px] border-y border-r border-gray  text-gray bg-yellow h-[6rem] flex items-center justify-center"
//           : "w-[33.5rem] text-[16px] border border-gray items-start text-gray bg-yellow h-[6.8rem] flex flex-col justify-center"
//       }`}
//     >
//       {clicked === false && "get notified"}
//       {clicked === true && (
//         <>
//           <p className={` ml-[1.5rem] mt-[-4px]`}>
//             enter email ID to get notified
//           </p>
//           <input
//             className="w-[30rem] bg-white ml-[1.5rem] border border-gray rounded-none mt-[2px] pl-[2rem] pb-[2px]"
//             placeholder="enter your email"
//           />
//         </>
//       )}
//     </div>
//     <button
//       onClick={() => {
//         setClicked(false);
//       }}
//       className={`w-[6.8rem] ${
//         clicked ? "opacity-100" : "opacity-0"
//       } transition-all duration-300 flex items-center justify-center h-[6.8rem] border-y border-r border-gray bg-green`}
//     >
//       <img src={right} />
//     </button>
//   </button>;
// }

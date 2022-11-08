import "./index.scss";
import FlipNumbers from "react-flip-numbers";

const NotifyContent = ({ digit, unit }) => {
  return (
    <div className="counter_div">
      <p>{unit}</p>
      <div className="number">
        <FlipNumbers
          height={80}
          width={40}
          numberStyle={{
            fontSize: "42px",
            fontWeight: "900",
          }}
          color="#53e1ad"
          play
          numbers={digit <= 9 ? `0${digit}` : `${digit}`}
        />
      </div>
    </div>
  );
};

export default NotifyContent;
<FlipNumbers />;
// import "./index.scss";
// import bell from "../Images/bell.svg";
// import FlipNumbers from "react-flip-numbers";
// const NotifyContent = ({ digit, unit }) => {
//   return (

//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         padding: "0 5px",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "purple",
//           borderRadius: 10,
//           padding: "5px 10px",
//           marginBottom: 5,
//         }}
//       >
//         <FlipNumbers
//           play
//           background="purple"
//           color="#fff"
//           width={40}
//           height={50}
//           numbers={digit <= 9 ? `0${digit}` : `${digit}`}
//         />
//       </div>
//       {unit.toUpperCase()}
//     </div>
//   );
// };

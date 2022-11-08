import FlipNumbers from "react-flip-numbers";

const NotifyContent = ({ digit, unit, show }) => {
  // console.log({ k: digit == 0 });
  return (
    <div
      className="w-[110px] border-gray h-[110px] grid place-items-center border relative "
      //   style={{ display: digit == 0 && unit == "days" && "none" }}
    >
      <p
        style={{ fontFamily: "Nuform Sans", color: "rgba(36, 36, 48, 0.25)" }}
        className="absolute left-0 top-[-30%] text-4xl mb-5"
      >
        {unit}
      </p>
      <div className="w-[full] h-fit">
        <FlipNumbers
          height={80}
          width={40}
          numberStyle={{
            fontSize: "54px",
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

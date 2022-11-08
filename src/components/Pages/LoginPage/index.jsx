import Animatepage from "../../../assets/comps/AnimateComponent";
import Nav from "../HomeScreenPage/components/Nav";

const index = () => {
  return (
    <Animatepage>
      <Nav />
      <div className="w-screen min-h-[calc(100vh-90px)] bg-white bg-[url('../../../public/Images/background.png')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <div className="w-[650px] h-[250px] flex">
          <div className="flex-1 bg-green border grid place-items-center relative">
            <div className="w-[325px] h-[125px]">
              <img
                src="../../../public/Images/wallet.svg"
                alt="wallet"
                className="w-full h-full bg-contain"
              />
              <h1 className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                Metamask
              </h1>
            </div>
          </div>
          <div className="flex-1 bg-yellow border grid place-items-center relative">
            <div className="w-[325px] h-[125px]">
              <img
                src="../../../public/Images/email.svg"
                alt="wallet"
                className="w-full h-full bg-contain"
              />
              <h1 className="whitespace-nowrap absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                signup/register with email
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Animatepage>
  );
};

export default index;

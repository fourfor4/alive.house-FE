import ErrorModal from "../../../../Modals/ErrorModal";
import InfoModal from "../../../../Modals/InfoModal";
import useMarketplace from "../../../../hooks/use-marketplace";
import wallet from "../../../../public/Images/wallet.svg";
import { setErrorMessage } from "../../../../hooks/useErrors";
import { useHookstate } from "@hookstate/core";
import {
  changeSingupModalState,
  usePaymentPending,
} from "../../../../globalStates/Home";
import { useAnalytics } from "../../../../hooks/useAnalytics";

const GenerateMetamaskComponent = () => {
  const marketplace = useMarketplace();
  const paymentState = useHookstate(usePaymentPending());
  const { _t } = useAnalytics();

  const handleLogin = async () => {
    _t("LOGIN:METAMASK:CLICKED");
    changeSingupModalState(false);
    try {
      marketplace.setProvider(marketplace.createMetamaskProvider());
      const address = await marketplace.getAddress();
      // console.log({address})
      await marketplace.saveMetaUserInfo(address);
      if (paymentState?.value) {
        setTimeout(() => {
          marketplace.state.showPaymentsPopup.set(true);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal />
      <InfoModal />
      <div className="flex-1 bg-green border grid place-items-center relative cursor-pointer">
        <div
          className="w-[325px] h-[125px]"
          // onClick={() => checkNetwork("polygon")}
          onClick={handleLogin}
        >
          <img src={wallet} alt="wallet" className="w-full h-full bg-contain" />
          <h1 className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            metamask
          </h1>
        </div>
      </div>
    </>
  );
};

export default GenerateMetamaskComponent;

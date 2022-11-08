import RotatingCassete from "../../../assets/AudioPage/Images/Rotatingcassete.gif";
import "./index.scss";
import Logo from "../../../assets/commonImg/logotitle.png";

const index = () => {
  return (
    <div className="restrict_view_container">
      <div className="restrict_view_logo_container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="restrict_view_info_container">
        <h2>Please open the site from your computer.</h2>
        <h2>Mobile app coming soon...</h2>
      </div>
      <div className="restrict_view_gif_container">
        <img src={RotatingCassete} alt="cassete" />
      </div>
    </div>
  );
};

export default index;

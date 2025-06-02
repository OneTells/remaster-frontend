import AthleteFormView from "../AthleteFormView/index.js";
import DopingCheckButtons from "../DopingCheckButtons";
import SvgIcon1 from "./icons/SvgIcon1";
import "./style.css";

function AthleteRegistrationView() {
  return (
    <div className="athlete-profile-card">
      <SvgIcon1 className="svg-container" />
      <div className="athlete-info-card1">
        <AthleteFormView />
        <DopingCheckButtons />
      </div>
    </div>
  );
}

export default AthleteRegistrationView;

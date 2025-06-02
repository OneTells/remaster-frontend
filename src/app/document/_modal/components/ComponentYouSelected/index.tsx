import AthleteRegistrationView from "../AthleteRegistrationView/index.js";
import "./style.css";

function ComponentYouSelected() {
  return (
    <div className="athlete-registration-form modal">
      <div className="athlete-profile-card1 modal-content">
        <AthleteRegistrationView />
      </div>
    </div>
  );
}

export default ComponentYouSelected;

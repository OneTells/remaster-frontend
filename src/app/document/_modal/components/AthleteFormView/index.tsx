import "./style.css";

function AthleteFormView() {
  return (
    <div className="center-column-with-gaps">
      <div className="info-block">
        <p className="header-text-container">ФИО</p>
        <div className="hierarchical-text-container">
          {/* Input Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <input value="Иванов Иван Иванович" type="text" className="input-field-with-border-radius input-style-f62::placeholder" />
        </div>
      </div>
      <div className="personal-info-container">
        <p className="profile-info-heading">Дата рождения</p>
        <div className="hierarchical-text-container">
          {/* Input Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <input value="23.04.2004" type="text" className="input-field-with-border-radius input-style-f62::placeholder" />
        </div>
      </div>
      <div className="sport-info-container">
        <p className="profile-info-heading">Вид спорта</p>
        <div className="hierarchical-text-container">
          {/* Select Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <div className="selectable-item-container">
            <p className="status-label">ЛА</p>
            {/*<SvgIcon1 className="svg-container1" />*/}
          </div>
        </div>
      </div>
      <div className="municipality-education-section">
        <p className="municipal-education-heading">
          Муницип.
          <br />
          образование
        </p>
        <div className="hierarchical-text-container">
          {/* Input Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <input value="Екатерингбург" type="text" className="input-field-with-border-radius input-style-f62::placeholder" />
        </div>
      </div>
      <div className="organization-info-container">
        <p className="header-text-container">Организация</p>
        <div className="hierarchical-text-container">
          {/* Input Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <input value="УГМК" type="text" className="input-field-with-border-radius input-style-f62::placeholder" />
        </div>
      </div>
      <div className="info-block">
        <p className="header-text-container">Доппинг</p>
        <div className="hierarchical-text-container">
          {/* Select Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <div className="selectable-item-container">
            <p className="status-label">Отрицательно</p>
            {/*<SvgIcon2 className="svg-container1" />*/}
          </div>
        </div>
      </div>
      <div className="flex-row-with-spacing">
        <p className="header-text-container">Присвоить</p>
        <div className="hierarchical-text-container">
          {/* Select Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <div className="selectable-item-container">
            <p className="status-label">Да</p>
            {/*<SvgIcon3 className="svg-container1" />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AthleteFormView;

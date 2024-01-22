import React, { useState } from "react";
import yourImage from "../assets/filter-square.png";

const CustomizationPopup = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handlePopupToggle = () => {
    setPopupVisibility(!isPopupVisible);
  };

  return (
    <div>
      <img
        className="customization_popup_trigger"
        src={yourImage}
        alt="Popup Trigger"
        onClick={handlePopupToggle}
      />
      {isPopupVisible && (
        <div className="customization_popup is-visible">
          <div className="customization_popup_container">
            <button
              className="customization_popup_close"
              onClick={() => setPopupVisibility(false)}
            />
            <div className="customization_popup_content">
              <p className="description">Filter items</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPopup;

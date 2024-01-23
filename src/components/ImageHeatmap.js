import React, { useEffect } from "react";

const ImageContainer = ({
  imageUrl,
  hotspots,
  onHotspotClick,
  activeHotspot,
  hotspotContents,
  onClosePopup,
}) => {
  const getPopupPosition = (hotspot) => {
    const popupWidth = 200; // Adjust this value as needed
    const popupHeight = 100; // Adjust this value as needed

    const left = hotspot.x + "px";
    const top = hotspot.y + "px";

    return {
      left,
      top,
      transform: `translate(-${popupWidth / 2}px, -${popupHeight}px)`, // Adjust this value as needed
    };
  };

  useEffect(() => {
    const handleClickOutsidePopup = (event) => {
      const popup = document.querySelector(".popup");
      if (popup && !popup.contains(event.target)) {
        onClosePopup();
      }
    };

    // Attach the event listener
    document.body.addEventListener("click", handleClickOutsidePopup);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutsidePopup);
    };
  }, [onClosePopup]);

  return (
    <div style={{ position: "relative" }}>
      <img src={imageUrl} alt="Subspace" />
      {hotspots.map((hotspot) => (
        <div
          className="hotspot"
          key={hotspot.id}
          style={{
            position: "absolute",
            left: hotspot.x,
            top: hotspot.y,
          }}
          onClick={() => onHotspotClick(hotspot.id)}
        />
      ))}
      {activeHotspot !== null && (
        <div
          className="popup"
          style={getPopupPosition(hotspots[activeHotspot - 1])}
        >
          <h3 className="hotspot-text">
            {hotspotContents[activeHotspot].title}
          </h3>
          <p className="hotspot-text">
            {hotspotContents[activeHotspot].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;

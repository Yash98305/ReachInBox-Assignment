import React, { useState } from "react";
import Switch from "react-switch";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons from react-icons

const ToggleButton = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <label>

      <Switch
      handleDiameter = {20}
        onChange={handleChange}
        checked={checked}
        offColor="#d8dbe0" // Light background when unchecked
        onColor="#28292c" // Dark background when checked
        boxShadow={null} // Remove the box shadow when not interacting
        activeBoxShadow={null} // Remove the shadow during interaction
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 18,
              color: "#d8dbe0",
              paddingRight: 2,
            }}
          >
            <FaMoon /> {/* Moon icon for dark mode */}
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 18,
              color: "#28292c",
              paddingRight: 2,
            }}
          >
            <FaSun /> {/* Sun icon for light mode */}
          </div>
        }
      />
    </label>
  );
};

export default ToggleButton;

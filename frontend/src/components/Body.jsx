import React, { useState, useEffect } from "react";
import { useNavigate,Outlet, useLocation } from "react-router-dom";
import VerticalNav from "./VerticalNav";
import HorizontalNav from "./HorizontalNav";
import InitialPage from "../pages/onebox/InitialPage";
import InboxPage from "../pages/onebox/InboxPage";
const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check the initial path and set the active section accordingly
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (location.pathname === "/onebox/list") {
      setActiveSection(1);
    } else {
      setActiveSection(0); // default path
    }
  }, [location.pathname]);

  // Update the URL path when the section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 1) {
      navigate("/onebox/list");
    } else {
      navigate("/"); // default route for InitialPage
    }
  };

  return (
    <>
      <div>
        <VerticalNav setActiveSection={handleSectionChange} />
      </div>
      <div>
        <HorizontalNav />
      </div>
      <div
        style={{
          position: "absolute",
          width: "96.31%",
          height: "90.42%",
          left: "57px",
          top: "67px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
         {activeSection === 0 && <InitialPage />}
        {activeSection === 1 && <InboxPage />}
      </div>
    </>
  );
};

export default Body;

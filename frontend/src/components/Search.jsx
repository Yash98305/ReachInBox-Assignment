import React from "react";
import useAuth from "../context/auth";
const img1 = "";

const Search = ({ setText }) => {
  const { theme } = useAuth();
  return (
    <div>
      <input
        type="text"
        style={{
          marginTop: 10,
          padding: "4px 6px",
          width: "100%",
          height: "28px",
          background: theme === "dark" ? "#23272C" : "#ffffff",
          border: `1px solid ${
            theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#DFE3E8"
          }`,
          borderRadius: "4px",
        }}
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Search;

import React from "react";
import useAuth from "../context/auth";

const MailCard = ({item}) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert 24h to 12h
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day} ${month} ${year} : ${hours}:${minutes}${ampm}`;
  };
  const {theme} = useAuth();
  return (
    <div
      style={{
        background: theme === "dark" ? "#141517":"#F9F9F9",
border: `1px solid ${theme === "dark" ? "#343A40" : "#E0E0E0"}`,
        boxShadow: theme === "dark" ?"0px 4px 8px rgba(255, 255, 255, 0.08)":"none",
        borderRadius: "4px",
        padding: "12px 16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: theme === "dark" ? "#F8FAFC":"#000000",
            fontSize: "17px",
            fontWeight: "600",
            lineHeight: "19px",
            marginBottom: 15,
          }}
        >
         {item.subject}
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "17px",
            color: theme === "dark" ? "#7F7F7F":"#637381",
            marginBottom: 15,
          }}
        >
          {formatDate(item?.sentAt)}
        </div>
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: "17px",
          color: theme === "dark" ? "#AEAEAE":"#637381",
          marginBottom: 15,
        }}
      >
        from : {item?.fromEmail}
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: "17px",
          color: theme === "dark" ? "#AEAEAE":"#637381",
          marginBottom: 15,
        }}
      >
        to : {item?.toEmail}
      </div>
      <div
        style={{
          fontSize: "15px",
          lineHeight: "22px",
          letterSpacing: "-0.01em",
          color: theme === "dark" ? "#E1E0E0":"#172B4D",
          marginBottom: 15,
          width:"70%"
        }}
        dangerouslySetInnerHTML={{ __html: item?.body }}
      >
        
      </div>
    </div>
  );
};

export default MailCard;

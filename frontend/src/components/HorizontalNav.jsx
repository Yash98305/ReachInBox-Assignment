import React from 'react'
import DarkSoulToggle from './DarkSoulToggle'

const HorizontalNav = () => {
  return (
    <div style={{
display: "flex",
alignItems: "center",
padding: "24px",
gap: "24px",
isolation: "isolate",

position: "absolute",
width: "100vw",
height: "64px",
background: "#1F1F1F",
borderWidth: "1px 1px 1px 0px",
borderStyle: "solid",
borderColor: "#343A40",
boxShadow: "inset 0px -186px 120px rgba(37, 39, 56, 0.1)",


    }}>
        <div style={{
fontWeight: 700,
fontSize: "16px",
lineHeight: "22px",
letterSpacing: "-0.02em",
color: "#FFFFFF",
marginLeft : "56px"
        }}>Onebox</div>
        <div><DarkSoulToggle/></div>
    </div>
  )
}

export default HorizontalNav
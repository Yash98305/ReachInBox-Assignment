import React from 'react'
import  ToggleButton  from './ToggleButton.jsx'
import useAuth from '../context/auth.jsx'

const HorizontalNav = () => {
  const {theme} = useAuth();
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
background: theme === "dark" ? "#1F1F1F" : "#fff",
borderWidth: "1px 1px 1px 0px",
borderStyle: "solid",
borderColor: "#343A40",
boxShadow: theme === "dark"? "inset 0px -186px 120px rgba(37, 39, 56, 0.1)":"none",


    }}>
        <div style={{
fontWeight: 700,
fontSize: "16px",
lineHeight: "22px",
letterSpacing: "-0.02em",
color: theme === "dark" ? "#FFFFFF" : "#000000",
marginLeft : "56px"
        }}>Onebox</div>
        <div style={{
          // border : "2px solid red"
        }}><ToggleButton/></div>
    </div>
  )
}

export default HorizontalNav
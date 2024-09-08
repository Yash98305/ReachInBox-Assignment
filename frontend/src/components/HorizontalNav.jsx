import React from 'react'
import  ToggleButton  from './ToggleButton.jsx'
import useAuth from '../context/auth.jsx'
import {Button} from "@mui/material"
import axios from 'axios'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const HorizontalNav = () => {
  const {setAuth,auth,theme} = useAuth();
  const navigate = useNavigate();
  const handleReset = async()=>{
    try {
      const res = await axios.get("https://hiring.reachinbox.xyz/api/v1/onebox/reset",{
        headers: { Authorization: `Bearer ${auth?.token}` },
      })
      if(res.data.status === 200){
        toast.success(res.data.data)
        localStorage.removeItem("auth");
        setAuth({ token: "",})
        navigate("/google-login");

      }else{
        toast.error("Error while rest")
      }
      console.log(res.data)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style={{
display: "flex",
alignItems: "center",
padding: "24px",
gap: "24px",
isolation: "isolate",
position: "absolute",
width: "100vw",
height: "67px",
background: theme === "dark" ? "#1F1F1F" : "#fff",
borderWidth: "1px 1px 1px 0px",
borderStyle: "solid",
borderColor: theme === "dark"?"#343A40":"#E0E0E0",
boxShadow: theme === "dark"? "inset 0px -186px 120px rgba(37, 39, 56, 0.1)":"none",
justifyContent:"space-between"

    }}>
        <div style={{
fontWeight: 700,
fontSize: "16px",
lineHeight: "22px",
letterSpacing: "-0.02em",
color: theme === "dark" ? "#FFFFFF" : "#000000",
marginLeft : "56px",
width:"90%"
        }}>Onebox</div>
        <div style={{        }}><ToggleButton/></div>
        <Button sx={{
          fontSize: "14px",
          lineHeight: "155%",
          textTransform:"none",
          fontWeight:700,
          color: theme === "dark"?"#FFFFFF":"#343A40",
          border: `2px solid ${theme === "dark"?"#343A40":"#DEDEDE"}`,
        }
        } onClick={handleReset}>
          Reset
        </Button>
    </div>
  )
}

export default HorizontalNav
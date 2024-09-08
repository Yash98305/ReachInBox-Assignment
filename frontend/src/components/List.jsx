import React from 'react'
import CampaignName from './svg/CampaignName'
import Interested from './svg/Interested'
import useAuth from '../context/auth'

const List = ({key,item,openMail,setDetail}) => {
    const {theme} = useAuth();
  return (
    <>
    <hr style={{
width: "255px",
marginBottom: 10,
marginTop:2,
border: "1px solid #33383F",
        }} />
    <div onClick={()=>{openMail(item?.threadId); setDetail(item);}} style={{
display: "flex",
alignItems: "flex-start",
padding: "12px 8px",
width: "255px",
height: "100px",
flexDirection: "column",
cursor : "pointer",
borderBottom: "1px solid rgba(255, 255, 255, 0.05)"

    }}>
    <div style={{
display: "flex",
flexDirection: "column",
height: "40px",
width:"100%"
    }}>
<div style={{
display : "flex",
justifyContent:"space-between"
}} ><p style={{
   

fontFamily: 'Inter',
fontWeight: 500,
fontSize: "14px",
lineHeight: "20px",
fontFeatureSettings: `'ss01' on, 'cv01' on, 'cv11' on`,
color: theme === "dark"?"#FFFFFF":"#343A40"



}}>{item.fromEmail}</p>
<p style={{

fontFamily: 'Inter',

fontWeight: 400,
fontSize: "12px",
lineHeight: "18px",
fontFeatureSettings: `'ss01' on, 'cv01' on, 'cv11' on`,

color: "rgba(252, 252, 252, 0.4)"
}}>Time</p></div>
<div style={{

fontFamily: 'Inter',
fontWeight: "400",
fontSize: "12px",
lineHeight: "18px",
fontFeatureSettings: `'ss01' on, 'cv01' on, 'cv11' on`,
marginTop:4,
color: theme === "dark"?"#E1E0E0":"#172B4D"





}}>{item.subject.length>40?`${item.subject?.substring(0,40)}...`:item.subject}</div>
    </div>
    <div style={{
        marginTop :12, 
display : "flex"
    }} >
    <Interested/>
<CampaignName />
</div>
    </div></>
  )
}

export default List;
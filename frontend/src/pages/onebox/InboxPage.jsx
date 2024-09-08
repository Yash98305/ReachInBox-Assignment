import React from 'react'

const InboxPage = () => {
  return (
    <div style={{
        border:"2px solid red",
        display : "flex",
        width : "100%",
        height : "100%",
        color : "#fff"
    }}>
        <div style={{
            width : "23%",
            border : "2px solid blue",
            padding : "15px 25px",
           
        }}>
                        <p style={{
                            fontWeight: 700,
fontSize: "20px",
lineHeight: "27px",
color:"#4285F4"
                        }}>All boxes</p>

        </div>
        <div style={{
            width:"57%",
            padding:"3px 5px 0px 5px",
            border : "2px solid blue"
        }}>
        </div>
        <div style={{
            width : "20%",
            border : "2px solid blue"
        }}></div>
    </div>
  )
}

export default InboxPage
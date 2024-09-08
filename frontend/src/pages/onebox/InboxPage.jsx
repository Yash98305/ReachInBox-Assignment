import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import List from "../../components/List";
import axios from "axios";
import "../../css/inbox.css";
import useAuth from "../../context/auth";
import MailCard from "../../components/MailCard";
import { toast } from "react-toastify";
import InitialPage from "./InitialPage";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

const InboxPage = () => {
  const [data, setData] = useState([]);
  const [messageDisplay, setMessageDisplay] = useState([]);
  const { open, setOpen,auth, theme,sel,setSel } = useAuth();
  const [detail, setDetail] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (id) => {
    id == 0 ?setOpenDialog(false):handledelete(sel);setOpenDialog(false);
  };
const handledelete = async(id) => {

  try {
    const res = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`,{
     headers : {
      Authorization : `Bearer ${auth?.token}`
     }
    })
    if(res.data.status === 200 ){
      toast.success(res.data.message)
      setDetail([]);
      setOpen(!open)
    }
  } catch (error) {
   console.log(error)
   toast.error("Select the message for delete") 
  }
}
  
  const getMailList = async () => {
    try {
      const res = await axios.get(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (res.data.status === 200) {
        setData(res.data.data);
      } else {
        toast.error("Failed to fetch mail list");
      }
    } catch (error) {
      console.log("Error fetching mail list:", error);
    }
  };
  const openMail = async(id) => {
    setOpen(true);
    console.log(id)
    try {
      const res = await axios.get(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (res.data.status === 200) {
        setMessageDisplay(res.data.data);
      } else {
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if ((event.key === "d" || event.key === "D" )) {
    sel.length>0 || sel &&  handleClickOpen();
               
    } else if (event.key === "r" || event.key === "R") {
      // Handle open dialog box
      // setIsDialogOpen(true);
      console.log("Dialog box opened!");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sel]);
  useEffect(() => {
    getMailList();
  }, [auth,open]);
 
  return (
    <><Dialog
    open={openDialog}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    
    <DialogContent>
      <DialogContentText id="alert-dialog-description">

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          fontSize: "25px",
          lineHeight: "23px",
          color: "#000",
          fontWeight:700,
          marginTop: "10px",
        }}>Are you sure?</div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10px",
          fontSize: "15px",
          lineHeight: "23px",
          color: "gray",
          fontWeight:400,
          marginTop: "10px",
        }}>Your selected email will be deleted. </div>
        
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>handleClose(0)}>Cancle</Button>
      <Button onClick={()=>handleClose(1)} >
      Delete
      </Button>
    </DialogActions>
  </Dialog>
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "20%",
          padding: "15px 25px",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "27px",
            color: "#4285F4",
          }}
        >
          All boxes
        </p>
        <Search />
        <div
          style={{
            marginTop: 20,
            height: "72vh",
            overflowY: "scroll",
          }}
        >
          {data.length > 0 ? (
            data.map((item, index) => (
              <List
                key={index}
                item={item}
                openMail={openMail}
                setDetail={setDetail}
                setSel = {setSel}
              />
            ))
          ) : (
            <p>No data available</p>
          )}
          <hr
            style={{
              width: "255px",
              marginTop: 2,
              marginBottom: 10,
              border: `1px solid ${theme === "dark" ? "#33383F" : "#DFE3E8"}`,
            }}
          />
        </div>
      </div>
      {open ? <>
      <div
        style={{
          width: "60%",
          borderRight: `1px solid ${theme === "dark" ? "#353533" : "#E0E0E0"}`,
          borderLeft: `1px solid ${theme === "dark" ? "#353533" : "#E0E0E0"}`,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 8px 0px 17px",
            height: "70px",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${
              theme === "dark" ? "#343A40" : "#E0E0E0"
            }`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "20px",
                fontFeatureSettings: `'ss01' on, 'cv01' on, 'cv11' on`,
                color: theme == "dark"?"#fff":"#343A40",
              }}
            >
              {detail?.fromName}
            </div>
            <div
              style={{
                marginTop: 5,
                fontFamily: "Inter",
                fontStyle: `normal`,
                fontWeight: 400,
                fontSize: `15px`,
                lineHeight: `18px`,
                fontFeatureSettings: `'ss01' on, 'cv01' on, 'cv11' on`,
                color: theme == "dark"?"#FFFFFF66":"rgba(52, 58, 64, 0.7)",
              }}
            >
              {detail?.fromEmail}
            </div>
          </div>
          {/* <Dropdown /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "8px",
              width: "32px",
              height: "32px",
              border: `1px solid ${theme === "dark" ? "#343A40" : "#DFE3E8"}`,
              borderRadius: "4px",
              justifyContent: "center",
            }}
          >
            <svg
              width="12"
              height="3"
              viewBox="0 0 12 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.99996 0.166748C1.26663 0.166748 0.666626 0.766748 0.666626 1.50008C0.666626 2.23341 1.26663 2.83341 1.99996 2.83341C2.73329 2.83341 3.33329 2.23341 3.33329 1.50008C3.33329 0.766748 2.73329 0.166748 1.99996 0.166748ZM9.99996 0.166748C9.26663 0.166748 8.66663 0.766748 8.66663 1.50008C8.66663 2.23341 9.26663 2.83341 9.99996 2.83341C10.7333 2.83341 11.3333 2.23341 11.3333 1.50008C11.3333 0.766748 10.7333 0.166748 9.99996 0.166748ZM5.99996 0.166748C5.26663 0.166748 4.66663 0.766748 4.66663 1.50008C4.66663 2.23341 5.26663 2.83341 5.99996 2.83341C6.73329 2.83341 7.33329 2.23341 7.33329 1.50008C7.33329 0.766748 6.73329 0.166748 5.99996 0.166748Z"
                fill={theme === "dark" ? "#D9D9D9" : "#172B4D"}
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            height: "79vh",
            display: "flex",
            flexDirection: "column",
            padding: 12,
            overflowY: "scroll",
          }}
        >
          {messageDisplay.length > 0 ? (
            messageDisplay.map((item, index) => (
              <MailCard key={index} item={item} />
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      
      <div
        style={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              padding: "8px 12px",
              width: "268px",
              height: "36px",
              background: theme === "dark" ? "#23272C" : "#ECEFF3",
              borderRadius: "8px",
              marginTop: 15,
              fontWeight: 700,
              color: theme === "dark" ? "#fff" : "#454F5B",
            }}
          >
            Lead Details
          </p>
          <div className="rtable">
            <div>
              <p
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#637381",
                }}
              >
                Name
              </p>
              <p
                style={{
                  color: theme === "dark" ? "#B9B9B9" : "#000000",
                }}
              >
                {detail?.fromName}
              </p>
            </div>
            <div>
              <p
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#637381",
                }}
              >
                Contact No
              </p>
              <p
                style={{
                  color: theme === "dark" ? "#B9B9B9" : "#000000",
                }}
              >
                +918433033825
              </p>
            </div>
            <div>
              <p
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#637381",
                }}
              >
                Email Id
              </p>
              {console.log(messageDisplay[0], 1112)}
              <p
                style={{
                  color: theme === "dark" ? "#B9B9B9" : "#000000",
                }}
              >
                {detail?.fromEmail}
              </p>
            </div>
            <div>
              <p
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#637381",
                }}
              >
                Linkedin
              </p>
              <p
                style={{
                  color: theme === "dark" ? "#B9B9B9" : "#000000",
                }}
              >
                https://www.linkedin.com/in/yashpatel98305/
              </p>
            </div>
            <div>
              <p
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#637381",
                }}
              >
                Company Name
              </p>
              <p
                style={{
                  color: theme === "dark" ? "#B9B9B9" : "#000000",
                }}
              >
                Reachinbox
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div></>: <div  style={{
          width: "80%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          borderLeft: `1px solid ${theme === "dark" ? "#353533" : "#E0E0E0"}`,
        }}>
<InitialPage/>
      </div>
      }
    </div></>
  );
};

export default InboxPage;

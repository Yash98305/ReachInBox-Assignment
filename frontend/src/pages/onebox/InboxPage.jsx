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
import { Button, Paper } from "@mui/material";
import Draggable from "react-draggable"

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const InboxPage = () => {
  const [data, setData] = useState([]);
  const [messageDisplay, setMessageDisplay] = useState([]);
  const { open, setOpen, auth, theme, sel, setSel } = useAuth();
  const [detail, setDetail] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogReplay, setOpenDialogReplay] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  
  const handleClickOpenReplay = () => {
    setOpenDialogReplay(true);
  };

  const handleClose = (id) => {
    if (id === 0) {
      setOpenDialog(false);
    } else {
      handleDelete(sel);
      setOpenDialog(false);
    }
  };

  const handleCloseReplay = () => {
    setOpenDialogReplay(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setDetail([]);
        setOpen(!open);
      }
    } catch (error) {
      console.log(error);
      toast.error("Select the message for delete");
    }
  };

  const getMailList = async () => {
    try {
      const res = await axios.get("https://hiring.reachinbox.xyz/api/v1/onebox/list", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (res.data.status === 200) {
        setData(res.data.data);
      } else {
        toast.error("Failed to fetch mail list");
      }
    } catch (error) {
      console.log("Error fetching mail list:", error);
    }
  };

  const openMail = async (id) => {
    setOpen(true);
    try {
      const res = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
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
    if (event.key === "d" || event.key === "D") {
      sel && handleClickOpen();
    } else if (event.key === "r" || event.key === "R") {
      sel && handleClickOpenReplay();
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
  }, [auth, open]);

  return (
    <>
      {/* Replay Dialog */}
      <Dialog
        open={openDialogReplay}
        onClose={handleCloseReplay}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Reply
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your reply here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseReplay}>
            Cancel
          </Button>
          <Button onClick={handleCloseReplay}>Send Reply</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", fontSize: "25px", fontWeight: 700 }}>
              Are you sure?
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10px", fontSize: "15px", fontWeight: 400 }}>
              Your selected email will be deleted.
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(0)}>Cancel</Button>
          <Button onClick={() => handleClose(1)}>Delete</Button>
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
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "18px",
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
            <svg width={12} height={3} viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.99996 0.166748C1.26663 0.166748 0.666626 0.766748 0.666626 1.50008C0.666626 2.23341 1.26663 2.83341 1.99996 2.83341C2.73329 2.83341 3.33329 2.23341 3.33329 1.50008C3.33329 0.766748 2.73329 0.166748 1.99996 0.166748ZM9.99996 0.166748C9.26663 0.166748 8.66663 0.766748 8.66663 1.50008C8.66663 2.23341 9.26663 2.83341 9.99996 2.83341C10.7333 2.83341 11.3333 2.23341 11.3333 1.50008C11.3333 0.766748 10.7333 0.166748 9.99996 0.166748ZM5.99996 0.166748C5.26663 0.166748 4.66663 0.766748 4.66663 1.50008C4.66663 2.23341 5.26663 2.83341 5.99996 2.83341C6.73329 2.83341 7.33329 2.23341 7.33329 1.50008C7.33329 0.766748 6.73329 0.166748 5.99996 0.166748Z" fill={theme =="dark" ? "#d9d9d9" : "#172b4d"} />
</svg>

          </div>
        </div>
        <div
          style={{
            height: "73vh",
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
       <div onClick={handleClickOpenReplay} style={{marginLeft:40,cursor:"pointer"}}> <svg width="136" height="40" viewBox="0 0 136 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="136" height="40" rx="4" fill="url(#paint0_linear_1_13178)"/>
<path d="M34 16.5V12.5L27 19.5L34 26.5V22.4C39 22.4 42.5 24 45 27.5C44 22.5 41 17.5 34 16.5Z" fill="#F7F7F7"/>
<path d="M62.1221 15.0059C62.9834 15.0059 63.6943 15.1107 64.2549 15.3203C64.82 15.5299 65.2393 15.849 65.5127 16.2773C65.7907 16.7057 65.9297 17.2503 65.9297 17.9111C65.9297 18.4033 65.8385 18.8226 65.6562 19.1689C65.474 19.5153 65.2347 19.8024 64.9385 20.0303C64.6423 20.2581 64.3255 20.4404 63.9883 20.5771L66.8252 25H64.9727L62.5596 20.9941H60.9531V25H59.3125V15.0059H62.1221ZM62.0127 16.373H60.9531V19.6406H62.0879C62.849 19.6406 63.4004 19.4993 63.7422 19.2168C64.0885 18.9342 64.2617 18.5173 64.2617 17.9658C64.2617 17.387 64.0771 16.9769 63.708 16.7354C63.3434 16.4938 62.7783 16.373 62.0127 16.373ZM71.1045 17.2891C71.779 17.2891 72.3577 17.4281 72.8408 17.7061C73.3239 17.984 73.6953 18.3783 73.9551 18.8887C74.2148 19.3991 74.3447 20.0098 74.3447 20.7207V21.582H69.293C69.3112 22.3158 69.5072 22.8809 69.8809 23.2773C70.2591 23.6738 70.7878 23.8721 71.4668 23.8721C71.9499 23.8721 72.3828 23.8265 72.7656 23.7354C73.153 23.6396 73.5518 23.5007 73.9619 23.3184V24.624C73.5837 24.8018 73.1986 24.9316 72.8066 25.0137C72.4147 25.0957 71.9453 25.1367 71.3984 25.1367C70.6556 25.1367 70.0016 24.9932 69.4365 24.7061C68.876 24.4144 68.4362 23.9814 68.1172 23.4072C67.8027 22.833 67.6455 22.1198 67.6455 21.2676C67.6455 20.4199 67.7891 19.6999 68.0762 19.1074C68.3633 18.515 68.7666 18.0638 69.2861 17.7539C69.8057 17.444 70.4118 17.2891 71.1045 17.2891ZM71.1045 18.499C70.5986 18.499 70.1885 18.6631 69.874 18.9912C69.5641 19.3193 69.3818 19.8001 69.3271 20.4336H72.7725C72.7679 20.0553 72.7041 19.7204 72.5811 19.4287C72.4626 19.137 72.2803 18.9092 72.0342 18.7451C71.7926 18.5811 71.4827 18.499 71.1045 18.499ZM80.0391 17.2891C80.9368 17.2891 81.6569 17.6172 82.1992 18.2734C82.7461 18.9297 83.0195 19.9049 83.0195 21.1992C83.0195 22.056 82.8919 22.7783 82.6367 23.3662C82.3861 23.9495 82.0329 24.3916 81.5771 24.6924C81.126 24.9886 80.5996 25.1367 79.998 25.1367C79.6152 25.1367 79.2826 25.0866 79 24.9863C78.7174 24.8861 78.4759 24.7562 78.2754 24.5967C78.0749 24.4326 77.9062 24.2549 77.7695 24.0635H77.6738C77.6966 24.2458 77.7171 24.4486 77.7354 24.6719C77.7581 24.8906 77.7695 25.0911 77.7695 25.2734V28.3564H76.1562V17.4326H77.4688L77.6943 18.4785H77.7695C77.9108 18.2643 78.0817 18.0661 78.2822 17.8838C78.4873 17.7015 78.7334 17.5579 79.0205 17.4531C79.3122 17.3438 79.6517 17.2891 80.0391 17.2891ZM79.6084 18.6016C79.1663 18.6016 78.8109 18.6904 78.542 18.8682C78.2777 19.0413 78.084 19.3034 77.9609 19.6543C77.8424 20.0052 77.7786 20.445 77.7695 20.9736V21.1992C77.7695 21.7598 77.8265 22.236 77.9404 22.6279C78.0589 23.0153 78.2526 23.3115 78.5215 23.5166C78.7949 23.7171 79.1641 23.8174 79.6289 23.8174C80.0208 23.8174 80.3444 23.7103 80.5996 23.4961C80.8594 23.2819 81.0531 22.9766 81.1807 22.5801C81.3083 22.1836 81.3721 21.7165 81.3721 21.1787C81.3721 20.363 81.2262 19.7295 80.9346 19.2783C80.6475 18.8271 80.2054 18.6016 79.6084 18.6016ZM86.4922 25H84.8789V14.3633H86.4922V25ZM87.6475 17.4326H89.3975L90.9492 21.7529C91.0176 21.9489 91.0791 22.1426 91.1338 22.334C91.193 22.5208 91.2432 22.7054 91.2842 22.8877C91.3298 23.07 91.3662 23.2523 91.3936 23.4346H91.4346C91.4801 23.1976 91.5439 22.9333 91.626 22.6416C91.7126 22.3454 91.8083 22.0492 91.9131 21.7529L93.4033 17.4326H95.1328L91.8857 26.0391C91.6989 26.5312 91.4688 26.9505 91.1953 27.2969C90.9264 27.6478 90.6074 27.9121 90.2383 28.0898C89.8691 28.2721 89.4476 28.3633 88.9736 28.3633C88.7458 28.3633 88.5475 28.3496 88.3789 28.3223C88.2103 28.2995 88.0667 28.2744 87.9482 28.2471V26.9619C88.0439 26.9847 88.1647 27.0052 88.3105 27.0234C88.4564 27.0417 88.6068 27.0508 88.7617 27.0508C89.0488 27.0508 89.2972 26.9938 89.5068 26.8799C89.7165 26.766 89.8942 26.6042 90.04 26.3945C90.1859 26.1895 90.3066 25.9548 90.4023 25.6904L90.6689 24.9795L87.6475 17.4326Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_1_13178" x1="-4.18461" y1="5.44379e-07" x2="132.773" y2="14.0714" gradientUnits="userSpaceOnUse">
<stop stopColor="#4B63DD"/>
<stop offset="1" stopColor="#0524BF" stopOpacity="0.99"/>
</linearGradient>
</defs>
</svg>
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

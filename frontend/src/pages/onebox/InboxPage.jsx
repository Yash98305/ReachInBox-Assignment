import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import List from "../../components/List";
import axios from "axios";
import "../../css/inbox.css";
import useAuth from "../../context/auth";
import Dropdown from "../../components/Dropdown";
import MailCard from "../../components/MailCard"
import { toast } from "react-toastify";
const InboxPage = () => {

  const [data, setData] = useState([]);
  const [messageDisplay, setMessageDisplay] = useState([]);
  const { auth,theme } = useAuth();
  console.log(theme)
  const [detail,setDetail] = useState();


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
  const openMail = async (id) => {
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
  useEffect(() => {
    getMailList();
  }, []);
  return (
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
              <List key={index} item={item} openMail={openMail} setDetail={setDetail}/>
            ))
          ) : (
            <p>No data available</p>
          )}
          <hr
            style={{
              width: "255px",
              marginTop: 2,
              marginBottom: 10,
              border: "1px solid #33383F",
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "60%",
          padding: "3px 5px 0px 5px",
          borderRight: "1px  solid #353533",
          borderLeft: "1px  solid #353533",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 8px 0px 17px",
            height: "70px",
            borderBottom: "1px solid #353533",
          }}
        >
<Dropdown/>

        </div>
        <div style={{
          height:"79vh",display:"flex",
          flexDirection:"column",padding:12,overflowY:"scroll"
        }}>
         {messageDisplay.length > 0 ? (
          messageDisplay.map((item, index) => (
              <MailCard key={index} item={item}/>
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
              background: theme === "dark"?"#23272C":"#ECEFF3",
              borderRadius: "8px",
              marginTop: 15,
              fontWeight:700,
              color:theme === "dark"?"#fff":"#454F5B",
            }}
          >
            Lead Details
          </p>
          <div className="rtable">
            <div>
              <p style={{
                color : theme === "dark"?"#FFFFFF":"#637381"
              }}>Name</p>
              <p style={{
                color: theme === "dark"?"#B9B9B9":"#000000"

              }}>{detail?.fromName}</p>
            </div>
            <div>
              <p style={{
                color : theme === "dark"?"#FFFFFF":"#637381"
              }}>Contact No</p>
              <p  style={{
                color: theme === "dark"?"#B9B9B9":"#000000"

              }}>+918433033825</p>
            </div>
            <div>
              <p style={{
                color : theme === "dark"?"#FFFFFF":"#637381"
              }}>Email Id</p>
              {console.log(messageDisplay[0], 1112)}
              <p  style={{
                color: theme === "dark"?"#B9B9B9":"#000000"

              }}>{detail?.fromEmail}</p>
            </div>
            <div>
              <p style={{
                color : theme === "dark"?"#FFFFFF":"#637381"
              }}>Linkedin</p>
              <p  style={{
                color: theme === "dark"?"#B9B9B9":"#000000"

              }}>https://www.linkedin.com/in/yashpatel98305/</p>
            </div>
            <div>
              <p style={{
                color : theme === "dark"?"#FFFFFF":"#637381"
              }}>Company Name</p>
              <p  style={{
                color: theme === "dark"?"#B9B9B9":"#000000"

              }}>Reachinbox</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default InboxPage;

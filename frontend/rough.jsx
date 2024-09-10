function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
  
  // Main Component
  const InboxPage = () => {
    const [data, setData] = useState([]);
    const [messageDisplay, setMessageDisplay] = useState([]);
    const [detail, setDetail] = useState();
    const [replay, setReplay] = useState({
      to: "",
      toName: "",
      from: "",
      fromName: "",
      subject: "",
      body: "",
      references: [],
      inReplyTo: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogReplay, setOpenDialogReplay] = useState(false);
    const { dialog, setDialog, open, setOpen, auth, theme, sel, setSel } = useAuth();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setReplay((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleKeyPress = useCallback((event) => {
      if (event.key === "d" && !dialog && detail) {
        setOpenDialogReplay(false);
        setDialog(true);
        handleClickOpen();
      }
      if (event.key === "r" && !dialog && detail) {
        setOpenDialog(false);
        setDialog(true);
        handleClickOpenReplay();
      }
    }, [dialog, detail]);
  
    const handleClickOpen = () => setOpenDialog(true);
    const handleClickOpenReplay = () => setOpenDialogReplay(true);
  
    const handleClose = async (id) => {
      if (id === 0) {
        setOpenDialog(false);
      } else {
        await handleDelete(sel);
        setOpenDialog(false);
      }
      setDialog(false);
    };
  
    const handleCloseReplay = () => {
      setOpenDialogReplay(false);
      setDialog(false);
    };
  
    const handleDelete = async (id) => {
      try {
        const res = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setDetail([]);
          setOpen(!open);
        }
      } catch (error) {
        toast.error("Select the message for delete");
      }
    };
  
    const getMailList = async () => {
      try {
        const res = await axios.get("https://hiring.reachinbox.xyz/api/v1/onebox/list", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        if (res.data.status === 200) {
          setData(res.data.data);
        } else {
          toast.error("Failed to fetch mail list");
        }
      } catch (error) {
        toast.error("Error fetching mail list");
      }
    };
  
    const openMail = async (id) => {
      setOpen(true);
      try {
        const res = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        if (res.data.status === 200) {
          setMessageDisplay(res.data.data);
        } else {
          toast.error("Failed to fetch messages");
        }
      } catch (error) {
        toast.error("Error fetching message details");
      }
    };
  
    const handleReplay = async () => {
      try {
       const res = await axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${sel}`, replay, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        console.log(object)
        setOpenDialogReplay(false);
      } catch (error) {
        toast.error("Error sending reply");
      }
    };
  
    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [handleKeyPress]);
  
    useEffect(() => {
      getMailList();
    }, [auth, open]);
  
    useEffect(() => {
      setReplay((prev) => ({
        ...prev,
        to: detail?.fromEmail,
        toName: detail?.fromName,
        fromName: detail?.toName,
        from: detail?.toEmail,
      }));
    }, [detail]);
  
    return (
      <>
        {/* Replay Dialog */}
        <Dialog open={openDialogReplay} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <div className="dialog-container">
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Reply
              <div onClick={handleCloseReplay} className="close-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8307 5.34297L14.6557 4.16797L9.9974 8.8263L5.33906 4.16797L4.16406 5.34297L8.8224 10.0013L4.16406 14.6596L5.33906 15.8346L9.9974 11.1763L14.6557 15.8346L15.8307 14.6596L11.1724 10.0013L15.8307 5.34297Z" fill="white" />
                </svg>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div className="dialog-field">
                  To: <input type="text" name="to" value={replay.to} onChange={handleChange} />
                </div>
                <div className="dialog-field">
                  From: <input type="text" name="from" value={replay.from} onChange={handleChange} />
                </div>
                <div className="dialog-field">
                  Subject: <input type="text" name="subject" value={replay.subject} onChange={handleChange} />
                </div>
                <textarea name="body" value={replay.body} onChange={handleChange} placeholder="Message" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div onClick={handleReplay} className="dialog-action-button">
                <svg width="114" height="40" viewBox="0 0 114 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="114" height="40" rx="4" fill="white" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000">Send</text>
                </svg>
              </div>
              <Button onClick={handleCloseReplay}>Cancel</Button>
            </DialogActions>
          </div>
        </Dialog>
        
        {/* Delete Dialog */}
        <Dialog open={openDialog} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete
            <div onClick={() => handleClose(0)} className="close-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8307 5.34297L14.6557 4.16797L9.9974 8.8263L5.33906 4.16797L4.16406 5.34297L8.8224 10.0013L4.16406 14.6596L5.33906 15.8346L9.9974 11.1763L14.6557 15.8346L15.8307 14.6596L11.1724 10.0013L15.8307 5.34297Z" fill="white" />
              </svg>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Are you sure you want to delete this message?</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(1)}>Delete</Button>
            <Button onClick={() => handleClose(0)}>Cancel</Button>
          </DialogActions>
        </Dialog>
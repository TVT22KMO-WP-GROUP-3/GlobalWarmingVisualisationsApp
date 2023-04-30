import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ShareButton() {
  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Your Page Title",
          text: "Your Page Description",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return (
    <Button className="sharebutton" onClick={shareContent} >
      Share
    </Button>
  );
}

export default function AlertDialog(props) {
  const { open, onClose, linkString } = props;
  const [linkCopiedMessage, setLinkCopiedMessage] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkString).then(
      () => {
        console.log("Link copied to clipboard!");
        setLinkCopiedMessage("Link Copied!");
        setTimeout(() => {
          setLinkCopiedMessage("");
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="linkdialog">
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="dialogwindow">
          <DialogContentText id="alert-dialog-description">
            Here is your link to share your view: {linkString || "No link available"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialogactions">
          <Button id="dialogbutton"onClick={copyToClipboard} className="linkdialog button">
            Copy Link
          </Button>
          <span id="linkcopytext">{linkCopiedMessage}</span>
          <ShareButton />
          <Button id="dialogbutton" onClick={onClose} className="linkdialog button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { FC, ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { CandidateExperience, CandidateStatus } from "../DataSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type ChildProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  experienceData:CandidateExperience [];
  setExperienceData: React.Dispatch<React.SetStateAction<CandidateExperience []>>;
};

const DivStyled = styled("div")({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginTop: "4px",
  paddingTop: "4px",
  height: "50px",
  fontSize: "14px",
});

const LabelStyled = styled("label")({
  width: "30%",
  fontSize: "14px",
  padding: "12px 45px",
  letterSpacing: "1px",
  color: "white",
});

const InputStyled = styled("input")({
  borderRadius: "25px",
  border: "2px solid white",
  backgroundColor: "white",
  color: "black",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
});

const SelectStyled = styled("select")({
  borderRadius: "25px",
  border: "2px solid white",
  backgroundColor: "white",
  color: "black",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
  width:'60%',
  marginLeft:"-14%"
});

const StyledButton = styled("button")({
  borderRadius: "25px",
  border: "2px solid white",
  backgroundColor: "green",
  color: "black",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "12px 45px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
  cursor: "pointer",
});

const ModalBox: FC<ChildProps> = ({ open, setOpen, experienceData, setExperienceData }): ReactElement => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<CandidateStatus>('Pending');
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  const handleClose = (e: any) => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (name == "") {
      toast.warn("Please enter student name", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (feedback == "") {
      toast.warn("Please enter feedback", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (rating>5 || rating<1) {
      toast.warn("Rating should be between 1 and 5", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      let id=1;
      if(experienceData.length>0){
        id=experienceData[experienceData.length-1].id+1;
      }
    
      const newExperience:CandidateExperience={id:id,name:name,feedback:feedback,status:status,rating:rating}
      setExperienceData([...experienceData,newExperience]);
      toast.success("New Experience added", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setOpen(false)
      setName('');
      setFeedback('');
      setStatus('Pending');
      setRating(1);
    }
  };

  return (
    <div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modal title
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            sx={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(16,232,164,1) 73%, rgba(15,231,167,1) 74%, rgba(0,212,255,1) 100%)",
            }}
          >
            <form>
              <DivStyled className="form-control">
                <LabelStyled>Name</LabelStyled>
                <InputStyled
                  type="text"
                  placeholder="Name"
                  className="inputText"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </DivStyled>
              <DivStyled className="form-control">
                <LabelStyled>Status</LabelStyled>
                {/* <InputStyled
                  type="text"
                  placeholder="Status"
                  className="inputText"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                /> */}
                <SelectStyled
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </SelectStyled>
              </DivStyled>
              <DivStyled className="form-control">
                <LabelStyled>FeedBack</LabelStyled>
                <InputStyled
                  type="text"
                  placeholder="FeedBack"
                  className="inputText"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </DivStyled>
              <DivStyled className="form-control">
                <LabelStyled>Rating</LabelStyled>
                <InputStyled
                  type="text"
                  placeholder="Rating"
                  className="inputText"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
              </DivStyled>
            </form>
          </DialogContent>
          <DialogActions>
            <StyledButton autoFocus onClick={handleSubmit}>
              Submit
            </StyledButton>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalBox;

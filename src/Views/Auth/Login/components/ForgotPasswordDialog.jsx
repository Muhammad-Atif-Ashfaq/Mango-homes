import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../../store/actions/authActions";
import { ThreeDots } from "react-loader-spinner";
import { useSnackbar } from "notistack";

const ForgotPasswordDialog = ({ open, close }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email);
    dispatch(forgotPassword(email))
      .then((result) => {
        setLoading(false);
        enqueueSnackbar(result.data.message, {
          variant: "success",
        });
        setEmail("");
        close();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Dialog open={open} onClose={close} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Enter registered email</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="email"
            value={email}
            label="Email"
            type="email"
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          {loading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              color="#3F27B9"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <Button variant="contained" type="submit">
              Send
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPasswordDialog;

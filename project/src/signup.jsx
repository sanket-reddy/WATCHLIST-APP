import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [access, setaccess] = useState("");

  async function handleSign() {
    let res = await axios.post("http://localhost:3000/signup", {
      username: email,
      password: password,
    });

    res = res.data;
    console.log(res);
    if (res.Permission === "ok") {
      localStorage.setItem("token", res.token);
      navigate("/watchlist");
    } else {
      setaccess("the email is already in use");
    }
  }

  return (
    <>
      <Card
        style={{
          width: "300px",
          marginTop: "140px",
          backgroundColor: "#eeeeee",
          marginLeft: "425px",
          padding: "30px",
          border: " 1px grey",
        }}
      >
        <h1>Enter the email </h1>
        <TextField
          id="filled-basic"
          label="email"
          variant="filled"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h1>Enter the password </h1>
        <TextField
          id="filled-basic"
          label="password"
          variant="filled"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <Button
          variant="contained"
          style={{ marginTop: "8px" }}
          onClick={handleSign}
        >
          SIGNUP
        </Button>
        <h4>{access}</h4>
      </Card>
    </>
  );
}

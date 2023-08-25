import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function addList() {
    let res = await axios.post("http://localhost:3000/add", {
      token: token,
      title: title,
      desc: description,
      img: img,
    });
    console.log(title);
    console.log(token);
    console.log(res.data);
    navigate("/watchlist");
  }

  return (
    <>
      <Card
        style={{
          backgroundColor: "#eeeeee",
          marginTop: "110px",
          marginLeft: "425px",
          width: "350px",
          padding: "10px",
        }}
      >
        <h2>Enter the title</h2>
        <TextField
          id="outlined-basic"
          label="title"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h2>Enter the description</h2>
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h2>Enter the img url</h2>
        <TextField
          id="outlined-basic"
          label="image"
          variant="outlined"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={addList}>
          ADD
        </Button>
      </Card>
    </>
  );
}

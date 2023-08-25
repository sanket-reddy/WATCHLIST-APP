import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function List() {
  const navigate = useNavigate();

  function handleadd() {
    navigate("/add");
  }

  let token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [token]);

  function Item(props) {
    return (
      <Card
        style={{
          marginTop: "120px",
          width: "200px",
          backgroundColor: "#000000",
          padding: "13px",
          color: "white",
          marginLeft: "4px",
          marginBottom: "15px",
          // height: "350px",
        }}
      >
        <img src={props.imgurl} alt="Item" />
        <h2 style={{ fontFamily: "revert" }}>{props.title}</h2>
        <h3>{props.desc}</h3>
        <Button variant="contained">SEE MORE</Button>
      </Card>
    );
  }

  if (user === null || user === undefined) {
    return (
      <Card
        style={{
          marginTop: "120px",
          width: "185px",
          backgroundColor: "#000000",
          padding: "14px",
          marginLeft: "15px",
          color: "white",
          height: "150px",
        }}
      >
        <h1>To add more click here</h1>
        <Button variant="contained" onClick={handleadd}>
          ADD MORE
        </Button>
      </Card>
    );
  } else
    return (
      <div id="body" style={{ height: "100vh", margin: "0px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* {user.map((item, index) => (
            <Item
              // key={index}
              imgurl={item.img}
              title={item.title}
              desc={item.desc}
              ))} */}
          {user.map((item, index) => (
            <Item
              key={index}
              imgurl={item.img}
              title={item.title}
              desc={item.desc}
            />
          ))}

          <Card
            style={{
              marginTop: "120px",
              width: "185px",
              backgroundColor: "#000000",
              padding: "14px",
              marginLeft: "15px",
              color: "white",
              height: "150px",
              marginBottom: "15px",
            }}
          >
            <h1>To add more click here</h1>
            <Button variant="contained" onClick={handleadd}>
              ADD MORE
            </Button>
          </Card>
        </div>
      </div>
    );
}

import { AppBar, Button } from "@mui/material";
import { orange, yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
export default function Appbar() {
  const navigate = useNavigate();

  function moveSign() {
    navigate("/signup");
  }

  function moveLogin() {
    navigate("/login");
  }

  return (
    <>
      <AppBar
        style={{
          backgroundColor: "orange",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Watchlist</h1>
          <div style={{ marginRight: "20px", marginTop: "17px" }}>
            <Button
              style={{
                backgroundColor: yellow[500],
                marginRight: "6px",
              }}
              onClick={moveLogin}
            >
              LOGIN
            </Button>
            <Button style={{ backgroundColor: yellow[500] }} onClick={moveSign}>
              SIGNUP
            </Button>
          </div>
        </div>
      </AppBar>
    </>
  );
}

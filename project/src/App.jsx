import Appbar from "./Appbar";
import Signup from "./signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./login";
import List from "./list";
import Add from "./add";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Route path="" element={<Appbar />}></Route> */}
        <Appbar></Appbar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<List />}></Route>
          <Route path="/add" element={<Add />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

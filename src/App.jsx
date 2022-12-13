import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <h1> Hello Well Come</h1>
      <Routes>
        <Route exact path="/" element={Home} />
        <Route exact path="/profile" element={Profile} />
        <Route exact path="/sign-in" element={SignIn} />
        <Route exact path="/sign-up" element={SignUp} />
        <Route exact path="/forget-password" element={ForgetPassword} />
        <Route exact path="/offers" element={Offers} />
      </Routes>
    </Router>
  );
}

export default App;

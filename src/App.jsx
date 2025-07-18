import './App.css'
import {ToastContainer} from "react-toastify/unstyled";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/email-verify" element={<EmailVerify/>}/>
        <Route exact path="/reset-password" element={<ResetPassword/>}/>


      </Routes>
    </div>
  )
}

export default App

import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Addnewpost from './page/Addnewpost';
import Profile from './page/Profile';
import ForgetPassword from './page/ForgetPassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Addnewpost" element={<Addnewpost />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

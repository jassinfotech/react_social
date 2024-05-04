import React from 'react'
import { Link, useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    const logout = ()=>{
        alert("Are you sure logout ?")
        localStorage.clear();
        navigate("/")
    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark header_bg">
                <div className="container">
                    <a className="navbar-brand" href="#!"><img src='../assets/logo.jpeg'/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                            <li className="nav-item px-5"><Link className="nav-link" to="/Profile">Profile</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="#!">Messages</Link></li>
                            <li className="nav-item px-5"><Link className="nav-link" to="/Addnewpost">New Post</Link></li>
                          
                        </ul>
                        <div class="navbar-nav ms-auto">
                        <a className="nav-link LogOut" onClick={logout}>LogOut</a>
                            <div className='user_img'>
                                <img src="https://htmldemo.net/adda/adda/assets/images/profile/profile-35x35-1.jpg" alt="profile picture"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
import { useState, useEffect } from 'react'
import axios from "axios";
import Header from './Header'
import { Link, useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('Islogin');
    const loginData = JSON.parse(isLogin);
    console.log('isLogin', loginData);
    const userId = loginData.id;
    const name = loginData.name;
    const username = loginData.username;
    const [profilePic, setProfilePic] = useState(null);
    const handleProfilePicUpload = (e) => {
        setProfilePic(e.target.files[0]);
    };
    const handleAddPost = (e) => {
        e.preventDefault();
        if (!profilePic) {
            alert('Please select an image');
            return;
        }
        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('userId', userId);
        axios.post('http://localhost:8000/upload-profile-pic', formData)
            .then((response) => {
                console.log('New post added!', response.data);
                navigate('/Home');
            })
            .catch((error) => {
                console.error('Error adding new post:', error);
                alert('Failed to add new post');
            });

    };
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4">
                            <div class="card" >
                                <img src="../assets/sample.svg" class="card-img-top" alt="Sample Image" />
                                <div class="card-body text-center">
                                    <h5 class="card-title">{username}</h5>
                                    <div >
                                        <input type="file"
                                            className="from_input"
                                            onChange={handleProfilePicUpload}
                                        />

                                    </div>
                                    <button class="btn btn-primary" type='sumbit' onClick={handleAddPost}>Update Profile pic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6"> </div>
                    <div className="col-lg-3">

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile
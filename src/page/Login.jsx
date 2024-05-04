import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginAndSingup.css"


const Login = () => {
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setLoginInput((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };
    const handleSignin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/signin', loginInput)
            .then(response => {
                console.log('User signed in!', response.data);
                localStorage.setItem('Islogin',  JSON.stringify(response.data));
                navigate("/home")
            })
            .catch(error => {
                console.error('Error signing in:', error);
                setError('Invalid username or password');
            });
    };
    return (
        <div className="loginBody">
            <div className="loginTitle">
                <h1> Every Voice Matters. </h1>
            </div>
            <div className="logInFrame">
                <div className="logInFrameText">
                    <p> Blue Canary </p>
                </div>
                {error && error}
                <form>
                    <input type="text"
                        onChange={changeHandler}
                        name="username"
                        placeholder="Username"
                        autoComplete="on"
                        required /> <br />
                    <input type="password"
                        onChange={changeHandler}
                        name="password"
                        placeholder="Password"
                        required /> <br />
                    <button className="submitButton"
                        type="submit"
                        onClick={handleSignin}>Login

                    </button>
                </form>
                <hr />
                <div className="links">
                    <Link to="/signUp">Sign up</Link>
                    <Link to="/ForgetPassword">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
}


export default Login;




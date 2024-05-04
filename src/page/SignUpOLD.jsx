import { useState } from "react";
import "./LoginAndSingup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formInputs, setFormInputs] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        dateOfBirth: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        setFormInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const registerHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/register', formInputs);
            console.log(response.data); // Assuming the server returns a response data object
           
            if (response.data.status === 'notOk') {
                setError(response.data.message);
            }
            else{
                navigate("/")
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');

        }
    };

    console.log(formInputs);
    return (
        <>
            <div class="signup-form">
                <form action="/examples/actions/confirmation.php" method="post">
                    <h2>Register</h2>
                   {error && <p class="hint-text text-red">{error}</p> } 
                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" name="name"
                                    placeholder="Name"
                                    onChange={changeHandler}
                                    required /></div>
                            <div class="col">
                                <input type="text" class="form-control" name="surname"
                                    placeholder="Surname"
                                    onChange={changeHandler}
                                    autoComplete="on"
                                    required /></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="email"
                            type="email"
                            placeholder="Email address"
                            onChange={changeHandler}
                            required />
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="username"
                            type="text"
                            placeholder="Username"
                            onChange={changeHandler}
                            required />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="password"

                            placeholder="Password"
                            onChange={changeHandler}
                            required />
                    </div>
                    <div class="form-group">
                        <input name="dateOfBirth"
                            type="date"
                            class="form-control"
                            onChange={changeHandler}
                            required />
                    </div>


                    <div class="form-group">
                        <button type="submit" onClick={registerHandler} class="btn btn-success btn-lg btn-block">Register Now</button>
                    </div>
                </form>
                <div class="text-center">Already have an account? <Link to="/">Log in</Link></div>
            </div>

        </>


    );


}

export default SignUp
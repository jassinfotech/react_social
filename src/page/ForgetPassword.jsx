import "./ForgetPassword.css";

const ForgetPassword = () => {
    return (
        <div className="recverPass p-5">
            <div className="recoverPasswordMainCont p-5">
                <p>Type your email to recover your password.</p>
                <div className="recoverPasswordCont">
                    <form>
                        <input type="email"
                            placeholder="Email"
                            autoComplete="on"
                            required />
                        <button id="recoverPasswordBtn">Recover password</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ForgetPassword;
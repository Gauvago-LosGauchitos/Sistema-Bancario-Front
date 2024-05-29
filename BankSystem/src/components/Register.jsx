import { useState } from "react";
import cerdo from '../assets/img/cerdito.jpg'

export const Register = ({ switchAuthAndler }) => {
    const [containerClass, setContainerClass] = useState('');

    const handleSignUpClick = () => {
        setContainerClass('sign-up-mode');
    };

    const handleSignInClick = () => {
        setContainerClass('');
    };

    const handleSignUpClick2 = () => {
        setContainerClass('sign-up-mode2');
    };

    const handleSignInClick2 = () => {
        setContainerClass('');
    };

    return (
        <div>
            <div className={`container ${containerClass}`}>
                <div className="signin-signup">
                    <form action="" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className="btn" />

                        <p className="account-text">Don't have an account? <a href="#" onClick={ switchAuthAndler }>Sign up</a></p>
                    </form>
                    <form action="" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Sign up" className="btn" />
                        <p className="account-text">Already have an account? <a href="" onClick={handleSignInClick2}>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Member of Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className="btn" onClick={handleSignInClick}>Sign in</button>
                        </div>
                        <img src="signin.svg" alt="" className="image" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>New to Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className="btn" onClick={handleSignUpClick}>Sign up</button>
                        </div>
                        <img src="signup.svg" alt="" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};


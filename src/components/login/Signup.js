import React, { Component } from "react";
import reactDom from "react-dom";
import "../../assets/css/login-signup.css";
import Header from "../Header";
import Movies from "../movies/Movies";
import Login from "./Login";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }
    
    render() {
        return (
            <>
                <Header />
                <div className="main login-main">
                    <p className="sign">ثبت نام</p>
                    <form onSubmit={(e) => {e.preventDefault(); reactDom.render(<Movies userEmail={this.state.email} />, document.getElementById("root"))}}>
                        <input className="inputText" type="text" autoComplete="off" placeholder="نام" required />
                        <input className="inputText" type="text" autoComplete="off" placeholder="نام مستعار" required />
                        <input className="inputText" type="date" autoComplete="off" placeholder="تاریخ تولد" />
                        <input className="inputText" type="email" autoComplete="off" placeholder="ایمیل" required />
                        <input className="inputText" type="password" autoComplete="off" placeholder="رمز عبور" required />
                        <div className="text-center">
                            <button type="submit" className="login-submit">ثبت نام</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                    </div>
                    <br />
                    <a className="signup" onClick={() => reactDom.render(<Login page={this.props.page} movie={this.props.movie} />, document.getElementById("root"))}>از اینجا وارد شوید</a>
                    <br />
                    <br />
                </div>
            </>
            
        );
    }
}

export default Signup;
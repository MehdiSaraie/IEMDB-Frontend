import React, { Component } from "react";
import reactDom from "react-dom";
import "../../assets/css/login-signup.css";
import Header from "../Header";
import { apiUrl } from "../../..";
import Signup from "./Signup";
import Movies from "../movies/Movies";
import MoviePage from "../movie/Movie";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    handleEmailChange = (e) => {
        this.setState(prevState => ({email: e.target.value}));
    }

    handlePasswordChange = (e) => {
        this.setState(prevState => ({password: e.target.value}));
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}users/login?email=${this.state.email}&password=${this.state.password}`, {method: "POST"});
        if (response.status === 200) {
            let page = this.props.page;
            let requestedComponent = page === 'movies' ? <Movies userEmail={this.state.email} /> :
                page === 'movie' ? <MoviePage movie={this.props.movie} /> :
                page === 'watchlist' ? <></> : <></>;
            reactDom.render(requestedComponent, document.getElementById("root"));
        }
    };

    render() {
        return (
            <>
                <Header />
                <div className="main login-main">
                    <p className="sign">ورود</p>
                    <form onSubmit={this.handleLogin}>
                        <input className="inputText" type="email"  value={this.state.email}
                            autoComplete="off" placeholder="ایمیل"
                            required onChange={this.handleEmailChange} />
                        <input className="inputText" type="password" value={this.state.password}
                            autoComplete="off" placeholder="رمز عبور"
                            required onChange={this.handlePasswordChange} />
                        <div className="text-center">
                            <button type="submit" className="login-submit">ورود</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                    </div>
                    <br />
                    <a className="signup" onClick={() => reactDom.render(<Signup page={this.props.page} movie={this.props.movie} />, document.getElementById("root"))}>حساب نداربد؟ اینجا کلیک کنید</a>
                    <br />
                    <br />
                </div>
            </>
        );
    }
}

export default Login;
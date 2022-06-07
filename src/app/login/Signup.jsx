import React, { useState } from "react";
import { useNavigate } from 'react-router';
import * as ReactDOM from 'react-dom';
import "../../assets/css/login-signup.css";
import Header from "../Header";
import Login from "./Login";
import Input from '../components/Input';
import { useAuth } from "../../hooks/use-auth";


export default function Signup() {
    const [name, setName] = useState('');
    const [nickname, setNickName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();
    const auth = useAuth();

    function signup(e) {
        e.preventDefault();
        auth.signup(name, nickname, birthDate, email, password).then(() => {
            toast.success('باموفقیت ثبت‌نام شدید.');
            // navigate('/');
        }).catch((err) => {
            let message;
            try {
                message = err.response.data.error;
            } catch (error) {
                message = 'خطایی رخ داده است.';
            }
            toast.error(message);
        });
    }

    return (
        <div className='container'>
            <Header />
            <div className="main login-main">
                <p className="sign">ثبت نام</p>
                <form onSubmit={signup}>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام" required onChange={setName} value={name}/>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام مستعار" required onChange={setNickName} value={nickname}/>
                    <Input className="inputText" type="date" autoComplete="off" placeholder="تاریخ تولد" onChange={setBirthDate} value={birthDate}/>
                    <Input className="inputText" type="email" autoComplete="off" placeholder="ایمیل" required onChange={setEmail} value={email}/>
                    <Input className="inputText" type="password" autoComplete="off" placeholder="رمز عبور" required onChange={setPassword} value={password}/>
                    <div className="text-center">
                        <button type="submit" className="login-submit">ثبت نام</button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                </div>
                <br />
                <a className="signup" onClick={()=>ReactDOM.render(<Login/>, document.getElementById("root"))}>از اینجا وارد شوید</a>
                <br />
                <br />
            </div>
        </div>

    );
}

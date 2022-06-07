import React, { useState } from "react";
import reactDom from "react-dom";
import "../../assets/css/login-signup.css";
import Header from "../Header";
import Login from "./Login";
import Input from '../components/Input';


export default function Signup() {
    const [name, setName] = useState('');
    const [nickname, setNickName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useAuth();

    function signup(e) {
        e.preventDefault();
        auth.signup(name, nickname, birthDate, email, password).then(() => {
            toast.success('باموفقیت ثبت‌نام شدید.');
            history.push('/');
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
        <>
            <Header />
            <div className="main login-main">
                <p className="sign">ثبت نام</p>
                <form onSubmit={signup}>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام" required onChange={setName}/>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام مستعار" required onChange={setNickName}/>
                    <Input className="inputText" type="date" autoComplete="off" placeholder="تاریخ تولد" onChange={setBirthDate}/>
                    <Input className="inputText" type="email" autoComplete="off" placeholder="ایمیل" required onChange={setEmail}/>
                    <Input className="inputText" type="password" autoComplete="off" placeholder="رمز عبور" required onChange={setPassword}/>
                    <div className="text-center">
                        <button type="submit" className="login-submit">ثبت نام</button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                </div>
                <br />
                <a className="signup" onClick={() => reactDom.render(<Login/>, document.getElementById("root"))}>از اینجا وارد شوید</a>
                <br />
                <br />
            </div>
        </>

    );
}

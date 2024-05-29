import React from "react";
import "../css/PageGlobal.css";
import "../css/Register.css";
import { apiUrl } from "../config/BeApiEndpoint";
import { useState } from "react";
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    const handleRegister = async () => {
        if (password !== rePassword) {
            alert("Mật khẩu không khớp");
            return;
        }
        try {
            const registerData = {
                username: username,
                password: password,
            };
            await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        alert("Đăng ký thành công");
                        navigator.navigate("/login");
                    } else {
                        alert(data.message);
                    }
                });
        } catch (error) {
            console.error("Có lỗi xảy ra khi đăng ký: ", error);
        }
    };

  return (
    <div className="register-page">
        <form className="register-form" onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
        }}> 
            <h1>Đăng ký</h1>
            <div>
                <label htmlFor="username">Tên đăng nhập</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="rePassword">Nhập lại mật khẩu</label>
                <input type="password" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
            </div>
            <button type="submit">Đăng ký</button>
        </form>
      
    </div>
  );
}
export default Register;
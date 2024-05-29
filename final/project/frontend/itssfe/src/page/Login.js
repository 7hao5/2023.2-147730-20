import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "../css/login.css";
import "../css/PageGlobal.css";
import { apiUrl } from "../config/BeApiEndpoint";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = useUser();

    const handleLogin = async () => {
        try {
            // Thông tin đăng nhập từ state của component
            const loginData = {
                username: username,
                password:password,
            };

            await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        // Đăng nhập thành công
                        login.login(data.data);
                        // Chuyển hướng đến trang chủ
                        navigate("/");
                    } else {
                        alert(data.message);
                    }
                });
        } catch (error) {
            console.error("Có lỗi xảy ra khi đăng nhập: ", error);
        }
    };


  return (
    <div className="row page" >
        <div className="login-form">
          <h1>Đăng nhập</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="custom-button" type="submit">
              Đăng nhập
            </button>
          </form>
          <p>
            Chưa có tài khoản?{" "}
            <Link id="register" to="/register">
              Đăng ký
            </Link>
          </p>
      </div>
      
    </div>
  );
}

export default Login;
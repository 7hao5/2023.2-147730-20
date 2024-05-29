import { Link } from "react-router-dom"
import React from "react"
import { useUser } from "../../UserContext"
import "./Nav.css"
const Nav = () => {
    const { user } = useUser();
    const logout = useUser();
    const handleLogout = () => {
        logout.logout();
    };
    return (
        <nav>
           
            {user ? (
                <ul>
                <li><Link to="/">Trang chủ</Link></li>
                {user?.role ===0 ?(<li><Link to="/order">Đặt hàng</Link></li>):<li><Link to="/checkOrder">Kiểm tra đơn nhận</Link></li>}
                <li><Link to="/inventory">Kiểm hàng</Link></li>
                <li><Link to="#" onClick={handleLogout}>Đăng xuất</Link></li>
                </ul>
            ) : (
                <li><Link to="/login">Đăng nhập</Link></li>
            )}
    </nav>
    );
}
export default Nav;
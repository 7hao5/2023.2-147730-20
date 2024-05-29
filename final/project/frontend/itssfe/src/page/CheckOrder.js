import React, { useEffect, useState } from 'react';
import "../css/PageGlobal.css";
import "../css/CheckOrder.css";
import { useUser } from '../UserContext';
import { apiUrl } from '../config/BeApiEndpoint';

const CheckOrder = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Thiết lập kết nối WebSocket
        const newSocket = new WebSocket('ws://localhost:8080/ws');
        setSocket(newSocket);
        newSocket.onopen = () => {
            console.log('Connected to WebSocket');
        }
        // Lắng nghe sự kiện từ WebSocket
        newSocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Khi nhận được thông báo về đơn hàng mới, gọi lại hàm fetchOrders để tải lại danh sách đơn hàng
            fetchOrders();
        };

        
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}/OrderList/siteCode/status/${user.siteCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders.');
            }

            const data = await response.json();
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user.siteCode]);

    const handleOrderStatusUpdate = async (orderListId) => {
        try {
            const response = await fetch(`${apiUrl}/OrderList/updateStatus/orderListId/${orderListId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update order status.');
            }

            alert('Đã cập nhật trạng thái đơn hàng!');
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (user?.role !== 1) {
        return (
            <div>
                <h1>404 Not Found</h1>
            </div>
        );
    }

    return (
        <div className='check-order'>
            <h1>Check Order</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order List ID</th>
                        <th>Site Code</th>
                        <th>Merchandise Code</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Delivery Means</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {!orders || orders.length === 0 ? (
                        <tr>
                            <td colSpan='7'>No orders</td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderListId}</td>
                                <td>{order.siteCode}</td>
                                <td>{order.merchandiseCode}</td>
                                <td>{order.quantity}</td>
                                <td>{order.unit}</td>
                                <td>{order.deliveryMeans}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button onClick={() => handleOrderStatusUpdate(order.orderListId)}>Đã gửi</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CheckOrder;

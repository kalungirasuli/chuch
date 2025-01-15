import React, { useState, useEffect } from 'react';
import { Modal, Alert } from "flowbite-react";
import { getAllOrders, getUserOrders, updateOrderStatus } from "../../firebase/Functions/Orders"; // Adjust the import path as needed

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        getAllOrders()
            .then((response) => {
                if (response.code === 200) {
                    setOrders(response.orders);
                    setFilteredOrders(response.orders);
                } else {
                    setAlert({ show: true, message: response.message, type: 'failure' });
                }
            })
            .catch((err) => {
                setAlert({ show: true, message: err.message, type: 'failure' });
            });
    }, []);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        const filtered = orders.filter(order => order.dateOfOrder === date);
        setFilteredOrders(filtered);
    };

    const handleRowClick = (userId) => {
        setLoading(true);
        getUserOrders(userId)
            .then((response) => {
                if (response.code === 200) {
                    setUserOrders(response.orders);
                    setSelectedUser(userId);
                    setShowModal(true);
                } else {
                    setAlert({ show: true, message: response.message, type: 'failure' });
                }
            })
            .catch((err) => {
                setAlert({ show: true, message: err.message, type: 'failure' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        setLoading(true);
        updateOrderStatus(orderId, newStatus)
            .then((response) => {
                if (response.code === 200) {
                    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
                    setFilteredOrders(filteredOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
                    setAlert({ show: true, message: response.message, type: 'success' });
                } else {
                    setAlert({ show: true, message: response.message, type: 'failure' });
                }
            })
            .catch((err) => {
                setAlert({ show: true, message: err.message, type: 'failure' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="div">
        <h1 >Orders</h1>
            <input type="date" value={selectedDate} onChange={handleDateChange} className="date-picker" />
            {alert.show && (
                <Alert color={alert.type} onDismiss={() => setAlert({ show: false, message: '', type: '' })}>
                    {alert.message}
                </Alert>
            )}
            <table className="">
                <thead className="text-white flex bg-brown/55 rounded-t-[10px]">
                    <tr>
                        <th className="p-5">Username</th>
                        <th className="p-5">Order Id</th>
                        <th className="p-5">Date of Order</th>
                        <th className="p-5">Number of Items</th>
                        <th className="p-5">Status</th>
                        <th className="p-5">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders && filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                            <tr key={index} className="text-black flex bg-white/90 rounded-b-[10px]" onClick={() => handleRowClick(order.userId)}>
                                <td className="p-5">{order.username}</td>
                                <td className="p-5">{order.orderId}</td>
                                <td className="p-5">{order.dateOfOrder}</td>
                                <td className="p-5">{order.numberOfItems}</td>
                                <td className="p-5">{order.status}</td>
                                <td className="p-5">
                                    <button onClick={() => handleStatusUpdate(order.id, 'Approved')} className="btn btn-success">Approve</button>
                                    <button onClick={() => handleStatusUpdate(order.id, 'Cancelled')} className="btn btn-danger">Cancel</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-5 text-center">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal show={showModal} size="lg" popup onClose={() => setShowModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            <h2>User Orders</h2>
                            {userOrders.map((order, index) => (
                                <div key={index}>
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Date of Order: {order.dateOfOrder}</p>
                                    <p>Number of Items: {order.numberOfItems}</p>
                                    <p>Status: {order.status}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
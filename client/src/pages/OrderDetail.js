import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`/orders/${id}`);
            setOrder(response.data.data.order);
        } catch (error) {
            toast.error('Failed to fetch order details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Order not found</h2>
                <Link to="/orders" className="text-blue-600 hover:underline">Back to My Orders</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Order Details</h1>
                <Link to="/orders" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                    Back to Orders
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Header */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-semibold">Order Number</p>
                                <h3 className="text-xl font-bold">#{order.orderNumber}</h3>
                                <p className="text-gray-600 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-lg font-bold">Items</h2>
                        </div>
                        <div className="divide-y">
                            {order.items.map((item, index) => (
                                <div key={index} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                        <div>
                                            <p className="font-bold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 px-6 py-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span>${order.shipping.cost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                                <span>Total</span>
                                <span className="text-blue-600">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 border-b pb-2">Shipping Address</h2>
                        <div className="text-gray-700 space-y-1">
                            <p className="font-bold">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                            <p>{order.shippingAddress.address.street}</p>
                            <p>{order.shippingAddress.address.city}, {order.shippingAddress.address.state} {order.shippingAddress.address.zipCode}</p>
                            <p>{order.shippingAddress.address.country}</p>
                            <div className="mt-4 pt-4 border-t text-sm">
                                <p><strong>Email:</strong> {order.shippingAddress.email}</p>
                                <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 border-b pb-2">Payment</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Method</span>
                                <span className="font-medium uppercase">{order.payment.method}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${order.payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.payment.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

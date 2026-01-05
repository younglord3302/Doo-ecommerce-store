import React from 'react';

const AdminSummary = ({ stats }) => {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card group hover:border-accent-indigo/50">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 flex items-center justify-center text-accent-indigo">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <span className="text-[10px] font-black text-accent-indigo uppercase tracking-widest">Users</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.stats?.totalUsers || 0}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Verified accounts</p>
                </div>
                
                <div className="glass-card group hover:border-accent-cyan/50">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <span className="text-[10px] font-black text-accent-cyan uppercase tracking-widest">Catalog</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.stats?.totalProducts || 0}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Digital works</p>
                </div>

                <div className="glass-card group hover:border-accent-rose/50">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent-rose/10 flex items-center justify-center text-accent-rose">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <span className="text-[10px] font-black text-accent-rose uppercase tracking-widest">Orders</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.stats?.totalOrders || 0}</p>
                    <p className="text-xs text-rose-500/80 mt-2 font-medium">{stats.stats?.monthlyOrders || 0} recent transactions</p>
                </div>

                <div className="glass-card group hover:border-white/30">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Revenue</span>
                    </div>
                    <p className="text-4xl font-black text-gradient">${stats.stats?.totalRevenue?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Total accumulated</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="glass rounded-3xl overflow-hidden border border-white/10">
                    <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h2 className="text-xl font-black tracking-tight">Recent <span className="text-accent-indigo">Transactions</span></h2>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        {stats.recentOrders?.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-black tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Reference</th>
                                        <th className="px-8 py-4">Artist</th>
                                        <th className="px-8 py-4">Value</th>
                                        <th className="px-8 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats.recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 text-sm font-bold text-white">#{order.orderNumber}</td>
                                            <td className="px-8 py-5 text-sm text-gray-400">{order.user?.name}</td>
                                            <td className="px-8 py-5 text-sm text-white font-black">${order.total}</td>
                                            <td className="px-8 py-5 text-right">
                                                <span className={`inline-flex px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                                                        order.status === 'shipped' ? 'bg-accent-indigo/10 text-accent-indigo' :
                                                            'bg-accent-rose/10 text-accent-rose'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center text-gray-500 font-medium">No recent transactions to display</div>
                        )}
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="glass rounded-3xl overflow-hidden border border-white/10">
                    <div className="px-8 py-6 border-b border-white/10 bg-white/5">
                        <h2 className="text-xl font-black tracking-tight">Inventory <span className="text-accent-rose">Alerts</span></h2>
                    </div>
                    <div className="p-0">
                        {stats.lowStockProducts?.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] text-gray-500 uppercase font-black tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Piece</th>
                                        <th className="px-8 py-4 text-right">Remaining</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats.lowStockProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-accent-rose/5 transition-colors">
                                            <td className="px-8 py-5 text-sm font-bold text-white uppercase tracking-tight">{product.name}</td>
                                            <td className="px-8 py-5 text-right">
                                                <span className="text-[10px] font-black text-accent-rose bg-accent-rose/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                                    {product.inventory.quantity} units
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center text-gray-500 font-medium">Studio inventory is perfectly balanced</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;

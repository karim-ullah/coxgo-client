'use client'
import React from 'react';
import { BiCheckCircle, BiPackage, BiX } from 'react-icons/bi';

const CustomerOverviewPage = () => {
    const sampleOrders = [
  { id: "ORD-2024-001", customer: "Karim Hossain", date: "18 Jul 2024", status: "delivered", amount: "৳850", area: "Cox's Bazar" },
  { id: "ORD-2024-002", customer: "Fatima Begum", date: "18 Jul 2024", status: "processing", amount: "৳1,240", area: "Ukhiya" },
  { id: "ORD-2024-003", customer: "Rahim Uddin", date: "17 Jul 2024", status: "pending", amount: "৳560", area: "Teknaf" },
  { id: "ORD-2024-004", customer: "Nasrin Akter", date: "17 Jul 2024", status: "delivered", amount: "৳2,100", area: "Ramu" },
  { id: "ORD-2024-005", customer: "Jamal Ahmed", date: "16 Jul 2024", status: "cancelled", amount: "৳730", area: "Cox's Bazar" },
];
    return (
        <div className="space-y-6">
      <div className="bg-accent rounded-2xl p-6 text-white">
        <h2 className="text-xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)" }}>Hello, Karim! 👋</h2>
        <p className="text-teal-100 text-sm">You have 1 active order. Est. delivery: 12:45 PM today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: "24", icon: BiPackage, sub: "All time", color: "text-primary bg-teal-50" },
          { label: "Delivered", value: "21", icon: BiCheckCircle, sub: "Completed", color: "text-emerald-600 bg-emerald-50" },
          { label: "Cancelled", value: "1", icon: BiX, sub: "Refunded", color: "text-red-500 bg-red-50" },
        ].map(({ label, value, icon: Icon, sub, color }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                <Icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Recent Orders</h3>
          <button onClick={() => setTab("orders")} className="text-sm text-primary font-semibold hover:underline cursor-pointer">View all</button>
        </div>
        <div className="space-y-3">
          {sampleOrders.slice(0, 3).map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
              <div>
                <div className="text-sm font-semibold text-foreground font-mono">{order.id}</div>
                <div className="text-xs text-muted-foreground">{order.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-foreground">{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default CustomerOverviewPage;
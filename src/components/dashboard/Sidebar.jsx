"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { BiBell, BiHome, BiLogOut, BiUpload } from "react-icons/bi";
import { FiPackage, FiUser } from "react-icons/fi";
import { PiLogLight } from "react-icons/pi";

const Sidebar = () => {
    const {data:session} = useSession()
    const user = session?.user
    
  const customer = [
    { icon: BiHome, label: "Dashboard", tab: "overview" },
    { icon: FiPackage, label: "My Orders", tab: "orders" },
    { icon: BiUpload, label: "Upload Prescription", tab: "upload" },
    { icon: BiBell, label: "Notifications", tab: "notifications" },
    { icon: FiUser, label: "Profile", tab: "profile" },
  ];
//   w-64 bg-[#0f172a] text-slate-300 flex-col fixed left-0 top-0 bottom-0 z-30 hidden md:flex
  return (
    <aside className="w-64 bg-[#0f1721] text-slate-300 md:flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <Link href={'/'}>
        <button
          
          className="flex items-center gap-2 cursor-pointer mb-4"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <PiLogLight size={14} className="text-white" />
          </div>
          <span
            className="font-extrabold text-white text-sm"
            
          >
            CoxGo
          </span>
        </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user?.name.split(' ').map(word=> word[0]).join('').toUpperCase()}
          </div>
          <div>
            <div className="text-white text-sm font-semibold">
              {user?.name}
            </div>
            <div className="text-xs text-slate-500">Cox's Bazar Sadar</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {customer.map(({ icon: Icon, label, tab: t }) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer"
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <BiLogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

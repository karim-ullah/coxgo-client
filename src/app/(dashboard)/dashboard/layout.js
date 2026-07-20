import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col px-6 py-10 flex-1 overflow-scroll">
        <Header/>
      {children}
      </div>

    </div>
  );
};

export default DashboardLayout;

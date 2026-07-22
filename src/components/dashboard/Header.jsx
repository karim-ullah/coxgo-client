import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  return (
    <div className="bg-background rounded-2xl shadow-sm flex items-center justify-between mb-6 p-5">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <h2 className="font-bold text-2xl text-foreground">Dashboard</h2>
      </div>
      <Button>
        <Link href={"/upload-rx"}>Upload Rx</Link>
      </Button>
    </div>
  );
};

export default Header;

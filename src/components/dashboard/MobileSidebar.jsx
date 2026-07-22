'use client'
import { useSession } from '@/lib/auth-client';
import { Button, Drawer } from '@heroui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BiBell, BiHome, BiUpload } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { FiBarChart2, FiFileText, FiPackage, FiUser } from 'react-icons/fi';

const MobileSidebar = () => {
  const router = useRouter()
    const { data: session } = useSession();
    const user = session?.user;
  
    const path = usePathname()
  
  
    const customer = [
      { icon: BiHome, label: "Overview", href: "/dashboard/customer/overview" },
      { icon: FiPackage, label: "My Orders", href: "/dashboard/customer/orders" },
      { icon: BiUpload, label: "Upload Prescription", href: "/upload-rx" },
      { icon: FiBarChart2, label: "AI Recommendations", href: "/ai/recommendations" },
    ];
    const admin = [
      { icon: FiBarChart2, label: "Overview", href: '/dashboard/admin/overview' },
      { icon: FiFileText, label: "Prescriptions", href: '/dashboard/admin/prescriptions' },
      { icon: FiPackage, label: "Orders" , href: '/dashboard/admin/orders'},
      { icon: FiUser, label: "AI Copy", href: "/ai/product-description" },
    ];
  
    const navItems = user?.role === 'customer' ? customer : admin
    return (
      <div className='md:hidden' >

        <Drawer>
      <Button variant="secondary" className={'border-none'}>
        <FaBars />
        
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left" >
          <Drawer.Dialog className={'bg-[#0f1721] text-white'}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = path === item.href;
                  return (

                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white  transition-colors hover:bg-accent ${isActive ? 'bg-accent' : ""}`}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                  )
                })}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
      </div>
    );
};

export default MobileSidebar;

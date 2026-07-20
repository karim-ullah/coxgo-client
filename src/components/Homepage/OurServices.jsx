import React from 'react';
import { BiChevronRight, BiPackage, BiShoppingBag, BiStore } from 'react-icons/bi';
import { FaBaby } from 'react-icons/fa';
import { FiActivity, FiZap } from 'react-icons/fi';
import { PiLogLight } from 'react-icons/pi';

const OurServices = () => {
    const services = [
    { icon: PiLogLight, title: "Prescription Medicines", desc: "Genuine medicines from licensed pharmacies, delivered to your door.", color: "bg-teal-50 text-teal-600" },
    { icon: FiZap, title: "Emergency Delivery", desc: "2-hour emergency delivery for urgent medical needs, 24/7 availability.", color: "bg-red-50 text-red-500" },
    { icon: FiActivity, title: "Health Products", desc: "Vitamins, supplements, and healthcare essentials delivered fast.", color: "bg-blue-50 text-blue-600" },
    { icon: FaBaby, title: "Baby Care", desc: "Diapers, formula, baby medicines — everything for your little one.", color: "bg-purple-50 text-purple-600" },
    { icon: BiShoppingBag, title: "Medical Devices", desc: "Blood pressure monitors, glucometers, thermometers, and more.", color: "bg-amber-50 text-amber-600" },
    { icon: BiStore, title: "Grocery (Coming Soon)", desc: "Daily essentials and groceries — launching very soon.", color: "bg-slate-50 text-slate-400" },
  ];
    return (
        <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'><BiPackage size={12} /> Our Services</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Everything You Need, Delivered
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From prescription medicines to baby care products — we've got your household healthcare covered.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} 
                className="bg-card border border-border rounded-2xl p-6 cursor-pointer group hover:shadow-lg hover:shadow-teal-50/80 transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <BiChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default OurServices;
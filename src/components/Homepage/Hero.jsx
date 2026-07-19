import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { BiShoppingBag, BiUpload } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

const Hero = () => {
    return (
        <section className="w-full relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#0d9488] min-h-[92vh] flex items-center">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #14b8a6 0%, transparent 60%), radial-gradient(circle at 75% 30%, #0891b2 0%, transparent 60%)" }} />
        <div className="container py-20 grid md:grid-cols-2 gap-12 items-center w-full relative">
          <div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <FiZap size={12} /> Cox's Bazar's Trusted Pharmacy Delivery
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Healthcare & Essential Delivery at Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                Doorstep
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Upload your prescription, place your order, and receive genuine medicines and essential products delivered safely to your home.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant='secondary'  size="lg" className="hover:bg-teal-50 shadow-lg shadow-teal-900/30">
                <BiUpload size={18} /> Upload Prescription
              </Button>
              <Button variant='primary' size="lg"  className="">
                <BiShoppingBag size={18} /> Order Now
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[{ n: "5,000+", l: "Orders Delivered" }, { n: "50+", l: "Partner Pharmacies" }, { n: "2 hrs", l: "Emergency Delivery" }].map(item => (
                <div key={item.l}>
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>{item.n}</div>
                  <div className="text-sm text-slate-400">{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="hidden md:block">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=500&fit=crop&auto=format"
                alt="Pharmacist preparing medicine delivery"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl shadow-teal-900/50 w-full object-cover h-[480px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                  <FaTruck size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Order Status</div>
                  <div className="text-sm font-bold text-foreground">Out for Delivery 🚴</div>
                </div>
              </div>
              <div className="absolute -top-6 right-6 bg-white rounded-xl shadow-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Today's Deliveries</div>
                <div className="text-2xl font-extrabold text-primary">142</div>
                <div className="text-xs text-emerald-600 font-semibold">↑ 12% from yesterday</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    );
};

export default Hero;
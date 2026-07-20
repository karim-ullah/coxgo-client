import Image from 'next/image';
import React from 'react';
import { BiCheckCircle, BiShield, BiStar } from 'react-icons/bi';
import { CiHeadphones } from 'react-icons/ci';
import { FaTruck } from 'react-icons/fa';
import { FiDollarSign, FiFileText } from 'react-icons/fi';

const WhyChooseus = () => {
      const whyItems = [
    { icon: BiCheckCircle, title: "Original Products", desc: "100% genuine medicines sourced from licensed pharmacies only." },
    { icon: CiHeadphones, title: "24/7 Support", desc: "Our team is always available to assist with your medical needs." },
    { icon: FiDollarSign, title: "Affordable Rates", desc: "Competitive delivery charges with no hidden fees." },
    { icon: BiShield, title: "Fully Secure", desc: "Your prescription data and personal info is always protected." },
    { icon: FiFileText, title: "Easy Ordering", desc: "Simple 4-step process from prescription upload to delivery." },
    { icon: FaTruck, title: "Wide Coverage", desc: "Delivering across Cox's Bazar, Ukhiya, Teknaf, Ramu, and more." },
  ];
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'><BiStar size={12} /> Why Choose Us</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Healthcare You Can Rely On
            </h2>
            <p className="text-muted-foreground mb-8">We understand that getting the right medicine on time is critical. Here's why thousands trust MediDeliverBD.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyItems.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>{title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=500&fit=crop&auto=format"
            width={600} height={500}
              alt="Healthcare professional" className="rounded-2xl w-full object-cover h-[460px] shadow-2xl" />
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-teal-400", "bg-blue-400", "bg-purple-400"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Happy Customers</div>
                  <div className="text-sm font-extrabold text-foreground">12,000+ served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default WhyChooseus;
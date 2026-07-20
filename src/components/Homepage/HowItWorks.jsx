import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { BiCheckCircle, BiStore, BiUpload } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';

const HowItWorks = () => {
    return (
         <section className="py-20 bg-accent/10 w-full">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'><FiActivity size={12} /> Process</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>How It Works</h2>
            <p className="text-muted-foreground mt-3">Four simple steps from prescription to doorstep delivery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[calc(12.5%+3rem)] right-[calc(12.5%+3rem)] h-0.5 bg-gradient-to-r from-primary via-teal-300 to-primary opacity-30" />
            {[
              { n: "01", icon: BiUpload, title: "Upload Prescription", desc: "Take a clear photo of your prescription and upload it through our secure form." },
              { n: "02", icon: BiCheckCircle, title: "We Verify", desc: "Our licensed pharmacists review and verify your prescription within 30 minutes." },
              { n: "03", icon: BiStore, title: "We Purchase", desc: "We source your medicines from trusted partner pharmacies at fair prices." },
              { n: "04", icon: FaTruck, title: "Deliver to You", desc: "Our rider delivers straight to your door. Track your order in real time." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <div key={n} 
                className="bg-white rounded-2xl p-6 border border-border text-center relative">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200/60">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="absolute top-5 left-5 text-4xl font-extrabold text-muted">{n}</div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg">
              <BiUpload size={18} /> <Link href={'/upload-rx'}>Upload Your Prescription Now</Link>
            </Button>
          </div>
        </div>
      </section>
    );
};

export default HowItWorks;
import React from 'react';
import { BiCheckCircle, BiShield, BiStore } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';

const TrustBar = () => {
    const trustItems = [
    { icon: BiCheckCircle, text: "Genuine Products" },
    { icon: BiStore, text: "Partner Pharmacies" },
    { icon: BiShield, text: "Secure Ordering" },
    { icon: BsTruck, text: "Fast Delivery" },
    { icon: FaDollarSign, text: "Cash on Delivery" },
  ];
    return (
        <section className="bg-accent py-4 w-full">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon size={16} className="text-teal-200" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default TrustBar;
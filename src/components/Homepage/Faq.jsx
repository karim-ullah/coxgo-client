
'use client'
import React, { useState } from 'react';
import { BiChevronDown, BiHelpCircle } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

const Faq = () => {
    const [openFaq, setOpenFaq] = useState()
    const faqs = [
  { q: "How do I upload my prescription?", a: "Click 'Upload Prescription', fill in your details, attach a clear photo of your prescription, and submit. Our team verifies it within 30 minutes." },
  { q: "Is emergency delivery available 24/7?", a: "Yes, our emergency delivery service operates 24 hours a day, 7 days a week across Cox's Bazar, Ukhiya, and Teknaf areas." },
  { q: "How long does standard delivery take?", a: "Standard delivery typically takes 2-4 hours within Cox's Bazar city. Deliveries to Ukhiya, Teknaf, and Ramu may take 3-6 hours." },
  { q: "What payment methods are accepted?", a: "We accept Cash on Delivery (COD), bKash, and Nagad. More payment options will be available soon." },
  { q: "Are the medicines genuine and certified?", a: "Yes. We source exclusively from licensed partner pharmacies and only dispense medicines against valid prescriptions." },
  { q: "Can I track my order in real time?", a: "Yes, use your Order ID and phone number on the Track Order page to get real-time status updates on your delivery." },
];
    return (
        <section className="py-20 bg-white w-full">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'><BiHelpCircle size={12} /> FAQ</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.slice(0, 4).map((faq, i) => (
              <div key={i} className="bg-accent/10 rounded-xl border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-teal-50/50 transition">
                  <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <BiChevronDown size={18} className="text-muted-foreground shrink-0 transition-transform" />
                </button>
                <div>
                  {openFaq === i && (
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    );
};

export default Faq;
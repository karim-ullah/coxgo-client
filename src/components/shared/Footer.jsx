import Link from 'next/link';
import React from 'react';
import { BiMapPin, BiPhone } from 'react-icons/bi';
import { BsMailbox } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { PiLogLight } from 'react-icons/pi';

const Footer = () => {
    const publicLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Upload Prescription", path: "/upload" },
    { label: "Track Order", path: "/track" },
    { label: "Emergency Delivery", path: "/emergency" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ];
    return (
        <footer className="bg-[#0f172a] text-slate-300 w-full">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <PiLogLight size={16} className="text-white" />
              </div>
              <span className="text-lg font-extrabold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Cox<span className="text-teal-400">Go</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Healthcare and essential goods delivered to your doorstep across Cox's Bazar district. Genuine medicines, trusted pharmacies.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2.5">
              {publicLinks.map(l => (
                <li key={l.path}>
                  <button  className="text-sm text-slate-400 hover:text-teal-400 transition cursor-pointer">
                    <Link href={'/'}>
                    {l.label}
                    </Link>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <BiPhone size={15} className="text-teal-400 mt-0.5 shrink-0" />
                <span>+880 1800-MEDIDLV<br />+880 1700-123456</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <BsMailbox size={15} className="text-teal-400 shrink-0" />
                support@CoxGo.com.bd
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FiMessageCircle size={15} className="text-teal-400 shrink-0" />
                WhatsApp: +880 1800-MED
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <BiMapPin size={15} className="text-teal-400 mt-0.5 shrink-0" />
                Kolatoli Road, Cox's Bazar<br />Chittagong, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2024 MediDeliverBD. All rights reserved.</p>
          <p>Made with ❤ for Cox's Bazar community</p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
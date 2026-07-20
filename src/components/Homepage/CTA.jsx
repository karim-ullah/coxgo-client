import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { BiUpload } from 'react-icons/bi';
import { FiZap } from 'react-icons/fi';

const CTA = () => {
    return (
         <section className="py-20 bg-accent relative overflow-hidden w-full">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
        <div className="container text-center relative">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to Get Your Medicines Delivered?
          </h2>
          <p className="text-teal-100 text-lg mb-8">Join 12,000+ customers who trust MediDeliverBD for their healthcare needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="primary"  className="bg-white text-teal-700 hover:bg-teal-50">
              <BiUpload size={18} /> <Link href={'/upload-rx'}>Upload Prescription</Link>
            </Button>
            <Button size="lg" variant="outline"  className="border-white/40 text-white hover:bg-white/10">
              <FiZap size={18} /> <Link href={'/emergency'}>Emergency Delivery</Link>
            </Button>
          </div>
        </div>
      </section>
    );
};

export default CTA;
import React from 'react';
import { BiMapPin } from 'react-icons/bi';

const DeliveryArea = () => {
    const coverageAreas = [
  { name: "Cox's Bazar Sadar", time: "1-2 hrs", charge: "৳40" },
  { name: "Ukhiya", time: "2-3 hrs", charge: "৳60" },
  { name: "Teknaf", time: "3-4 hrs", charge: "৳80" },
  { name: "Ramu", time: "2-3 hrs", charge: "৳60" },
  { name: "Chakaria", time: "3-5 hrs", charge: "৳90" },
  { name: "Maheshkhali", time: "2-4 hrs", charge: "৳70" },
];
    return (
        <section className="py-20 bg-accent/10 w-full">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'><BiMapPin size={12} /> Coverage</h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Delivery Areas</h2>
            <p className="text-muted-foreground mt-3">We deliver across Cox's Bazar district and surrounding upazilas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverageAreas.map(({ name, time, charge }) => (
              <div key={name} className="bg-white rounded-xl border border-border p-5 flex items-center justify-between hover:border-primary/30 hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <BiMapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">Est. {time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{charge}</div>
                  <div className="text-xs text-muted-foreground">delivery</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default DeliveryArea;
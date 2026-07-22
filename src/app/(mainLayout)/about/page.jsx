import Image from "next/image";
import { BiBookOpen, BiHeart, BiStar } from "react-icons/bi";
import { FiZap } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#0f172a] to-[#134e4a] py-24 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3" style={{ fontFamily: "var(--font-heading)" }}>Our Story</h1>
          <p className="text-slate-300 mt-4 text-lg leading-relaxed">Born from a simple need — reliable medicine delivery in Cox's Bazar.</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className='flex items-center justify-center gap-2 font-mono text-sm'> <BiHeart size={12} /> Why We Started</h2>
            <h2 className="text-3xl font-extrabold text-foreground mb-5" style={{ fontFamily: "var(--font-heading)" }}>Healthcare Shouldn't Be Complicated</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">In 2023, our founder's elderly parent needed urgent medication at midnight in Cox's Bazar. Every pharmacy was closed. That experience revealed a critical gap in our healthcare infrastructure.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">We built MediDeliverBD to ensure no family in Cox's Bazar ever faces that situation. By connecting licensed pharmacies with a reliable delivery network, we bring genuine medicines to your doorstep — any time, any area.</p>
            <p className="text-muted-foreground leading-relaxed">Today, we serve over 12,000 households across Cox's Bazar district, with 50+ partner pharmacies and a team of dedicated delivery riders who understand the urgency of healthcare.</p>
          </div>
          <Image src="https://plus.unsplash.com/premium_photo-1661769786626-8025c37907ae?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          height={450} width={600}
            alt="Pharmacy team" className="rounded-2xl shadow-xl w-full object-cover h-[420px]" />
        </div>
      </section>

      <section className="py-20 bg-accent/10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Our Mission", icon: FiZap, text: "To make quality healthcare accessible to every household in Cox's Bazar district — regardless of location or time of day." },
              { title: "Our Vision", icon: BiStar, text: "To be Bangladesh's most trusted healthcare delivery platform, expanding across all coastal and underserved districts." },
              { title: "Our Values", icon: BiHeart, text: "Trust, transparency, and compassion. We handle every prescription with the care and confidentiality it deserves." },
            ].map(({ title, icon: Icon, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-border">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
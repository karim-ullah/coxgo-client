"use client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { BiCheckCircle, BiMapPin, BiPhone, BiSend } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { FiMessageCircle } from "react-icons/fi";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <div className="bg-gradient-to-br from-[#0f172a] to-[#134e4a] py-16 px-4 text-center">
        <h2 className="flex items-center justify-center gap-2 font-mono text-sm">
          <CgMail size={12} /> Contact
        </h2>
        <h1
          className="text-4xl font-extrabold text-white mt-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get in Touch
        </h1>
        <p className="text-slate-300 mt-3">
          We're here to help. Reach us through any channel below.
        </p>
      </div>

      <section className="py-16 bg-muted">
        <div className="container grid md:grid-cols-2 gap-10">
          <div>
            <h2
              className="text-2xl font-extrabold text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact Channels
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: BiPhone,
                  label: "Phone",
                  value: "+880 1800-MEDIDLV",
                  sub: "Available 24/7 for emergencies",
                  color: "bg-teal-50 text-teal-600",
                },
                {
                  icon: FiMessageCircle,
                  label: "WhatsApp",
                  value: "+880 1800-MED-WAP",
                  sub: "Quick responses, share images",
                  color: "bg-green-50 text-green-600",
                },
                {
                  icon: BiSend,
                  label: "Facebook Messenger",
                  value: "fb.me/MediDeliverBD",
                  sub: "Message us on Facebook",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: CgMail,
                  label: "Email",
                  value: "support@medideliver.com.bd",
                  sub: "Response within 4 hours",
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  icon: BiMapPin,
                  label: "Address",
                  value: "Kolatoli Road, Cox's Bazar",
                  sub: "Chittagong District, Bangladesh",
                  color: "bg-amber-50 text-amber-600",
                },
              ].map(({ icon: Icon, label, value, sub, color }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl border border-border p-5 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="font-semibold text-foreground text-sm">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 flex items-center justify-center">
            {sent ? (
              <div className="text-center py-8">
                <BiCheckCircle
                  size={48}
                  className="text-primary mx-auto mb-4"
                />
                <h3
                  className="text-xl font-bold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  We'll get back to you within 4 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4 w-full bg-white p-5 rounded-2xl"
              >
                <h2
                  className="text-xl font-bold text-foreground mb-5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Send a Message
                </h2>
                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
                    if (value.length < 4) {
                      return "Name must be at least 4 characters";
                    }
                    return null;
                  }}
                >
                  <Label className="text-foreground">Full Name</Label>
                  <Input placeholder="Enter your name" />
                  <FieldError />
                </TextField>
                <TextField isRequired name="email" type="email">

                  <Label className="text-foreground">Email</Label>
                  <Input placeholder="karim@example.com" />
                  <FieldError />
                </TextField>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  <BiSend size={16} /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

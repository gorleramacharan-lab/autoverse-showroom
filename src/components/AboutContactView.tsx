import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/extraData';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3D37A] text-xs uppercase tracking-[0.22em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> The AUTOVERSE Standard
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
          Redefining Automotive Discovery
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          AUTOVERSE is India’s premier digital smart car showroom—bridging everyday smart mobility
          and bespoke ultra-luxury masterpieces under one transparent, interactive platform.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl glass-panel-gold space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#F3D37A] font-bold">
            Our Mission
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Every Dream Car, Effortlessly Accessible
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            To empower every driver—from first-time hatchback buyers to seasoned supercar
            collectors—with verified specifications, transparent estimated INR pricing, intelligent
            comparisons, and concierge-grade test drive experiences.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">
            Our Vision
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            The Future of Smart Mobility
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            To build the world’s most trusted digital automotive pavilion, accelerating the shift
            toward safer, smarter, and cleaner electric mobility while celebrating the timeless art
            of grand touring and engineering excellence.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-6">
        <h2 className="font-display text-3xl font-bold text-white text-center">
          Why Choose AUTOVERSE?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: 'Verified Specifications',
              desc: 'Accurate technical data, safety ratings, and realistic estimated INR pricing with zero hidden jargon.',
            },
            {
              icon: Award,
              title: 'Economy to Ultra-Luxury',
              desc: 'From ₹3.99 Lakh city hatchbacks to ₹10.50 Crore Rolls-Royce flagships, curated in one showroom.',
            },
            {
              icon: Globe,
              title: 'EV-Ready Intelligence',
              desc: 'Dedicated electric mobility insights including real-world range, DC fast charging, and battery tech.',
            },
            {
              icon: Headphones,
              title: '24/7 Concierge Support',
              desc: 'Dedicated automotive advisors for test drives, financing, loan estimation, and delivery.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#0D1017] border border-white/10 hover:border-[#D4AF37]/40 transition-all"
            >
              <item.icon className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
          Get In Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
          Contact AUTOVERSE
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          Speak with our showroom advisors for bespoke vehicle sourcing, corporate fleets, or test
          drive assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-display text-xl font-bold text-white">Concierge Desk</h3>
            <div className="space-y-3 text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+91 1800-AUTOVERSE (Toll-Free Placeholder)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>concierge@autoverse-showroom.example</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                <span>AUTOVERSE Flagship Pavilion, Worli Sea Face, Mumbai 400018, India</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1017] border border-white/10">
            <h4 className="text-xs uppercase tracking-wider text-[#F3D37A] font-bold mb-3">
              National Experience Centers
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {SHOWROOM_LOCATIONS.map((loc) => (
                <li key={loc} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {loc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="h-full rounded-3xl glass-panel-gold p-10 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h3 className="font-display text-2xl font-bold text-white">Message Received</h3>
              <p className="text-sm text-zinc-300 max-w-md">
                Thank you, {name}. Our AUTOVERSE concierge advisor will reach out to{' '}
                <span className="text-[#F3D37A]">{email}</span> within 2 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl glass-panel p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                  Inquiry Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option>General Inquiry</option>
                  <option>Luxury & Supercar Allocation</option>
                  <option>EV Home Charging Consultation</option>
                  <option>Finance & Insurance Assistance</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our concierge team assist you?"
                  className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D37A] to-[#C59B27] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

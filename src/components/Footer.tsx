"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Phone, MapPin, Send, Loader2, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API newsletter signup
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <footer className="bg-primary-dark text-pure-white border-t border-pure-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative accent overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(175,203,203,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-pure-white/10">

        {/* Brand Block */}
        <div className="lg:col-span-4 flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-mint-aqua/10 flex items-center justify-center text-mint-aqua">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-heading">
                  DENTIVA
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-graphite-slate -mt-1 font-semibold">
                  Aesthetics
                </span>
              </div>
            </div>
            <p className="text-xs text-graphite-slate font-light leading-relaxed max-w-sm mb-6">
              Empowering patient smile transformations through digital diagnostic modeling, personalized treatment pathways, and state-of-the-art biological composite restoration.
            </p>
          </div>

          <div className="space-y-3.5 text-xs text-graphite-slate font-light">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-mint-aqua shrink-0 mt-0.5" />
              <span>Block C, Connaught Place, Near Metro Gate 3, New Delhi, Delhi 110001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-mint-aqua shrink-0" />
              <span className="cursor-default text-graphite-slate select-none">
                +91 XXXXX XXXXX (Demo Desk)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-mint-aqua shrink-0" />
              <a href="mailto:support@dentiva.in" className="hover:text-pure-white transition-colors">
                support@dentiva.in
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours Block */}
        <div className="lg:col-span-3 text-left">
          <h4 className="text-sm font-bold tracking-wider uppercase text-heading mb-6">
            Operating Hours
          </h4>
          <div className="space-y-3 text-xs text-graphite-slate font-light">
            <div className="flex justify-between border-b border-pure-white/5 pb-2">
              <span>Monday - Friday</span>
              <span className="text-pure-white">8:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-pure-white/5 pb-2">
              <span>Saturday</span>
              <span className="text-pure-white">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-pure-white/5 pb-2">
              <span>Sunday</span>
              <span className="text-mint-aqua font-semibold">Emergency Desk Only</span>
            </div>
          </div>
          <p className="text-[10px] text-graphite-slate/70 mt-4 leading-relaxed font-light">
            *Emergency walk-ins accepted outside standard operational hours. Please notify our front desk prior to arrival.
          </p>
        </div>

        {/* Directory Links Block */}
        <div className="lg:col-span-2 text-left">
          <h4 className="text-sm font-bold tracking-wider uppercase text-heading mb-6">
            Treatment Directory
          </h4>
          <ul className="space-y-3 text-xs text-graphite-slate font-light">
            <li>
              <a href="#specializations" className="hover:text-pure-white transition-colors">
                Vibrant Checkups
              </a>
            </li>
            <li>
              <a href="#specializations" className="hover:text-pure-white transition-colors">
                Revitalized Cleaning
              </a>
            </li>
            <li>
              <a href="#specializations" className="hover:text-pure-white transition-colors">
                Reinforced Fillings
              </a>
            </li>
            <li>
              <a href="#specializations" className="hover:text-pure-white transition-colors">
                Invisible Aligners
              </a>
            </li>
            <li>
              <a href="#discounts" className="hover:text-pure-white transition-colors">
                Membership Rates
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter capture block */}
        <div className="lg:col-span-3 text-left">
          <h4 className="text-sm font-bold tracking-wider uppercase text-heading mb-6">
            Stay Updated
          </h4>
          <p className="text-xs text-graphite-slate font-light leading-relaxed mb-4">
            Subscribe to our weekly diagnostic insights, scheduling slots, and general updates.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={subscribed || loading}
              className="w-full bg-pure-white/5 text-pure-white placeholder-graphite-slate text-xs px-4 py-3.5 rounded-xl border border-pure-white/10 focus:outline-none focus:border-mint-aqua pr-12 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscribed || loading}
              className="absolute right-1 top-1 bottom-1 w-10 bg-mint-aqua text-primary-dark rounded-lg flex items-center justify-center hover:bg-mint-aqua/90 transition-colors disabled:opacity-50"
              aria-label="Subscribe to newsletter"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : subscribed ? (
                <Check className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          {error && <p className="text-[10px] text-red-400 mt-2 font-medium">{error}</p>}
          {subscribed && (
            <p className="text-[10px] text-mint-aqua mt-2 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Added to newsletter list!
            </p>
          )}
        </div>

      </div>

      {/* Copyright block */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-graphite-slate font-light gap-4">
        <span>© {new Date().getFullYear()} Dentiva Aesthetics. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-pure-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-pure-white transition-colors">Terms of Operations</a>
          <a href="#" className="hover:text-pure-white transition-colors">ISO Standards</a>
        </div>
      </div>
    </footer>
  );
}
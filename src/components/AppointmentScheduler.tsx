"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Check, ChevronRight, ChevronLeft, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Appointment } from "@/types";

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
  selectedTier: 'Essential' | 'Aesthetic Pro' | 'Dentiva Signature' | '';
}

export default function AppointmentScheduler({
  isOpen,
  onClose,
  selectedService: initialService,
  selectedTier: initialTier,
}: AppointmentSchedulerProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [tier, setTier] = useState<'Essential' | 'Aesthetic Pro' | 'Dentiva Signature'>("Essential");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setService(initialService || "Vibrant Checkups");
      setTier(initialTier || "Essential");
      setSelectedDate("");
      setSelectedSlot("");
      setForm({ name: "", email: "", phone: "", notes: "" });
      setErrors({});
    }
  }, [isOpen, initialService, initialTier]);

  // Generate next 5 active weekdays
  const getNextDays = () => {
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let count = 0;
    let index = 1;
    while (count < 5) {
      const date = new Date();
      date.setDate(date.getDate() + index);
      // Skip Sundays
      if (date.getDay() !== 0) {
        days.push({
          dayOfWeek: weekdays[date.getDay()],
          dayOfMonth: date.getDate(),
          month: months[date.getMonth()],
          fullDateStr: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        });
        count++;
      }
      index++;
    }
    return days;
  };

  const dates = getNextDays();

  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "11:45 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear error
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateStep3 = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.name.trim()) tempErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else {
      const cleanPhone = form.phone.replace(/[\s-]/g, "");
      if (!/^(?:\+?91|0)?[6789]\d{9}$/.test(cleanPhone)) {
        tempErrors.phone = "Please enter a valid 10-digit Indian phone number (e.g. +91 XXXXX XXXXX).";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!service) return;
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedSlot) return;
      setStep(3);
    } else if (step === 3) {
      if (validateStep3()) {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      const code = `DENT-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmCode(code);
      setStep(4);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/85 backdrop-blur-md">

        {/* Backdrop close button */}
        <div className="absolute inset-0 cursor-default" onClick={onClose} />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary-dark/10 z-10 flex flex-col md:flex-row min-h-[520px]"
        >
          {/* Side Banner (Dark Theme Info block) */}
          <div className="md:w-1/3 bg-primary-dark text-pure-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(175,203,203,0.1),transparent_50%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] text-mint-aqua font-bold uppercase tracking-widest block mb-1">
                Dentiva System
              </span>
              <h3 className="text-xl font-bold tracking-tight text-heading mb-4 text-left">
                Aesthetic Booking
              </h3>

              {/* Step indicator */}
              <div className="space-y-4 mt-8">
                {[
                  { num: 1, label: "Treatment Tier" },
                  { num: 2, label: "Date & Time" },
                  { num: 3, label: "Your Details" },
                  { num: 4, label: "Confirmation" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-3 text-left">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${step === s.num
                        ? "bg-mint-aqua text-primary-dark font-extrabold"
                        : step > s.num
                          ? "bg-mint-aqua/30 text-mint-aqua"
                          : "bg-pure-white/10 text-graphite-slate"
                        }`}
                    >
                      {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span
                      className={`text-xs tracking-wide font-medium ${step === s.num ? "text-pure-white font-semibold" : "text-graphite-slate"
                        }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 text-left pt-8 border-t border-pure-white/10 mt-8 hidden md:block">
              <p className="text-[10px] text-graphite-slate leading-relaxed">
                Need immediate assistance? <br />
                <span className="text-mint-aqua font-semibold">Demo Helpdesk Active</span>
              </p>
            </div>
          </div>

          {/* Interactive Form panel (Right) */}
          <div className="flex-1 p-8 flex flex-col justify-between bg-white text-primary-dark">
            {/* Header / Close */}
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold tracking-tight text-heading text-left">
                {step === 1 && "Select Treatment & Tier"}
                {step === 2 && "Pick Date & Slot"}
                {step === 3 && "Complete Patient File"}
                {step === 4 && "Booking Confirmed"}
              </h4>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-primary-dark/5 text-graphite-slate hover:text-primary-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slides & Form Content */}
            <div className="flex-1 py-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-2">
                        Primary Dental Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-primary-dark/10 bg-primary-dark/[0.01] text-sm focus:outline-none focus:border-mint-aqua"
                      >
                        <option value="Vibrant Checkups">Vibrant Checkups (Diagnostics)</option>
                        <option value="Revitalized Cleaning">Revitalized Cleaning (Prophylaxis)</option>
                        <option value="Reinforced Fillings">Reinforced Fillings (Restorations)</option>
                        <option value="Digital Orthodontics">Digital Orthodontics (Invisible Aligners)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-2">
                        Select Care Tier
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { id: "Essential", desc: "Standard clinic service, diagnostic & essential composite treatment" },
                          { id: "Aesthetic Pro", desc: "Added cosmetic polishing, ultrasonic scaling, and fluoridation" },
                          { id: "Dentiva Signature", desc: "CAD/CAM 3D styling, VIP custom alignment pathing & full warranty" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTier(t.id as any)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${tier === t.id
                              ? "border-mint-aqua bg-mint-aqua/5 text-primary-dark"
                              : "border-primary-dark/5 bg-primary-dark/[0.01] text-graphite-slate hover:border-primary-dark/10"
                              }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-bold ${tier === t.id ? "text-primary-dark" : "text-primary-dark/85"}`}>
                                {t.id}
                              </span>
                              {tier === t.id && (
                                <div className="w-4 h-4 rounded-full bg-mint-aqua flex items-center justify-center text-primary-dark">
                                  <Check className="w-3 h-3 text-primary-dark stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-light leading-relaxed block text-graphite-slate">
                              {t.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6 text-left"
                  >
                    {/* Date Picker */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-3">
                        Choose Date Slot
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {dates.map((d) => {
                          const isSelected = selectedDate === d.fullDateStr;
                          return (
                            <button
                              key={d.fullDateStr}
                              type="button"
                              onClick={() => setSelectedDate(d.fullDateStr)}
                              className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center transition-all ${isSelected
                                ? "border-mint-aqua bg-mint-aqua/10 text-primary-dark font-semibold shadow-sm"
                                : "border-primary-dark/5 bg-primary-dark/[0.01] text-graphite-slate hover:border-primary-dark/10"
                                }`}
                            >
                              <span className="text-[9px] uppercase tracking-wider text-graphite-slate mb-0.5">
                                {d.dayOfWeek}
                              </span>
                              <span className="text-lg font-bold tracking-tight text-heading">
                                {d.dayOfMonth}
                              </span>
                              <span className="text-[9px] uppercase tracking-wider text-graphite-slate mt-0.5">
                                {d.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Picker */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-3">
                        Available Sessions
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((t) => {
                          const isSelected = selectedSlot === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedSlot(t)}
                              className={`py-3.5 rounded-xl border text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all ${isSelected
                                ? "border-mint-aqua bg-mint-aqua/10 text-primary-dark font-bold shadow-sm"
                                : "border-primary-dark/5 bg-primary-dark/[0.01] text-graphite-slate hover:border-primary-dark/10"
                                }`}
                            >
                              <Clock className="w-3.5 h-3.5 opacity-75" />
                              <span>{t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-graphite-slate/60" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Aarav Sharma"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-primary-dark/[0.01] focus:outline-none focus:border-mint-aqua ${errors.name ? "border-red-500 bg-red-50/10" : "border-primary-dark/10"
                            }`}
                        />
                      </div>
                      {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-graphite-slate/60" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="patient@domain.in"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-primary-dark/[0.01] focus:outline-none focus:border-mint-aqua ${errors.email ? "border-red-500 bg-red-50/10" : "border-primary-dark/10"
                            }`}
                        />
                      </div>
                      {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-graphite-slate/60" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-primary-dark/[0.01] focus:outline-none focus:border-mint-aqua ${errors.phone ? "border-red-500 bg-red-50/10" : "border-primary-dark/10"
                            }`}
                        />
                      </div>
                      {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-graphite-slate mb-1">
                        Special Notes (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-graphite-slate/60" />
                        <textarea
                          name="notes"
                          rows={2}
                          value={form.notes}
                          onChange={handleInputChange}
                          placeholder="Please note general tooth alignments or sensitivity issues..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-dark/10 text-sm bg-primary-dark/[0.01] focus:outline-none focus:border-mint-aqua resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-5 py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-mint-aqua/10 flex items-center justify-center text-mint-aqua animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xl font-bold tracking-tight text-heading text-primary-dark">
                        Appointment Confirmed!
                      </h5>
                      <p className="text-xs text-graphite-slate max-w-sm mx-auto leading-relaxed">
                        Your booking has been registered in the Dentiva clinic ledger. We have sent a confirmation details code to <span className="font-semibold text-primary-dark">{form.email}</span>.
                      </p>
                    </div>

                    {/* Booking Receipt Summary Card */}
                    <div className="w-full bg-primary-dark/5 rounded-2xl p-5 border border-primary-dark/5 space-y-3.5 text-left text-xs max-w-md mx-auto">
                      <div className="flex justify-between border-b border-primary-dark/5 pb-2 font-bold uppercase text-[10px] tracking-wider text-graphite-slate">
                        <span>Receipt Summary</span>
                        <span className="text-mint-aqua">{confirmCode}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div>
                          <span className="block text-[9px] text-graphite-slate font-semibold uppercase tracking-wider">Patient</span>
                          <span className="font-medium text-primary-dark">{form.name}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-graphite-slate font-semibold uppercase tracking-wider">Service</span>
                          <span className="font-medium text-primary-dark">{service}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-graphite-slate font-semibold uppercase tracking-wider">Tier</span>
                          <span className="font-medium text-primary-dark">{tier}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-graphite-slate font-semibold uppercase tracking-wider">Date & Time</span>
                          <span className="font-medium text-primary-dark">{selectedDate} at {selectedSlot}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-primary-dark hover:bg-primary-dark/95 text-pure-white text-xs font-bold tracking-wider uppercase transition-colors"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons footer (only if step < 4) */}
            {step < 4 && (
              <div className="flex items-center justify-between border-t border-primary-dark/5 pt-6 mt-6">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border transition-all ${step === 1
                    ? "text-graphite-slate/40 border-transparent cursor-not-allowed"
                    : "text-primary-dark border-primary-dark/10 hover:bg-primary-dark/5"
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !service) ||
                    (step === 2 && (!selectedDate || !selectedSlot)) ||
                    loading
                  }
                  className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary-dark/95 text-pure-white px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-mint-aqua" />
                      Securing Slot...
                    </>
                  ) : (
                    <>
                      {step === 3 ? "Confirm Booking" : "Continue"}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
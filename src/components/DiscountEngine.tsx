"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Check, HelpCircle, Flame, ArrowRight, DollarSign, Calculator } from "lucide-react";

interface TreatmentItem {
  id: string;
  name: string;
  standardPrice: number;
  memberPrice: number;
}

export default function DiscountEngine() {
  const [selectedItems, setSelectedItems] = useState<string[]>(["consultation", "cleaning"]);
  const [isYearly, setIsYearly] = useState(true);

  const treatments: TreatmentItem[] = [
    { id: "consultation", name: "Premium Diagnostic & Scan", standardPrice: 2499, memberPrice: 499 },
    { id: "cleaning", name: "Ultrasonic Prophylaxis Cleaning", standardPrice: 4999, memberPrice: 999 },
    { id: "filling", name: "Bio-Composite Ceramic Filling", standardPrice: 2499, memberPrice: 499 },
    { id: "aligners", name: "Digital Orthodontics Consultation & Trays", standardPrice: 74999, memberPrice: 14999 },
  ];

  const handleToggle = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Calculations
  const standardTotal = treatments
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.standardPrice, 0);

  const memberTotal = treatments
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.memberPrice, 0);

  const subscriptionCost = isYearly ? 1199 * 12 : 1499 * 12; // annualized representation
  const totalSavings = Math.max(0, standardTotal - memberTotal - subscriptionCost);

  return (
    <section id="discounts" className="py-24 bg-primary-dark text-pure-white relative overflow-hidden">
      {/* Visual backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(175,203,203,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,140,141,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-mint-aqua font-bold text-xs uppercase tracking-widest block mb-3">
            Budget-Friendly Coverage
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-heading leading-tight text-pure-white">
            Dentiva Membership Plan <br />
            <span className="text-graphite-slate font-light">80% Direct Coverage on Services</span>
          </h2>
          <p className="text-graphite-slate text-sm sm:text-base font-light max-w-xl mt-4 leading-relaxed">
            By avoiding insurance brokers, we offer direct subscription contracts. Lock in flat-rate 80% discounts on all primary dental treatments.
          </p>
        </div>

        {/* Dynamic Calculator & Plan Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mx-auto">
          
          {/* Plan benefits (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left w-full">
            <div className="glassmorphism-card-dark rounded-3xl p-6 sm:p-8 border border-pure-white/10 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-mint-aqua/10 flex items-center justify-center text-mint-aqua">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-heading text-pure-white">
                    Exclusive Member Plan
                  </h3>
                  <p className="text-[10px] text-graphite-slate font-semibold uppercase tracking-wider">
                    Instant Access • Zero Wait Time
                  </p>
                </div>
              </div>

              {/* Pricing Subscription display */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-heading text-mint-aqua">₹1,199</span>
                <span className="text-sm text-graphite-slate">/ month (billed annually)</span>
              </div>

              {/* Bullet points */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-aqua/20 flex items-center justify-center text-mint-aqua shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-pure-white block">Immediate Activation</span>
                    <span className="text-xs text-graphite-slate font-light">Coverage begins the second you subscribe. No pre-approvals.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-aqua/20 flex items-center justify-center text-mint-aqua shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-pure-white block">80% Flat Coverage</span>
                    <span className="text-xs text-graphite-slate font-light">Applicable to all standard checkups, deep cleanings, and composite fillings.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint-aqua/20 flex items-center justify-center text-mint-aqua shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-pure-white block">No Hidden Copays or Deductibles</span>
                    <span className="text-xs text-graphite-slate font-light">Pay exactly the 20% member cost listed. Nothing more.</span>
                  </div>
                </li>
              </ul>

              {/* Plan Toggle Button */}
              <div className="flex bg-primary-dark p-1 rounded-xl border border-pure-white/10 w-fit">
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isYearly ? "bg-mint-aqua text-primary-dark font-bold" : "text-graphite-slate hover:text-pure-white"
                  }`}
                >
                  Yearly (₹1,199/mo)
                </button>
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    !isYearly ? "bg-mint-aqua text-primary-dark font-bold" : "text-graphite-slate hover:text-pure-white"
                  }`}
                >
                  Monthly (₹1,499/mo)
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Savings Calculator (Right) */}
          <div className="lg:col-span-7 w-full">
            <div className="glassmorphism-card-dark rounded-3xl p-6 sm:p-8 border border-pure-white/10 flex flex-col justify-between text-left h-full w-full">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-pure-white/10">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-mint-aqua animate-pulse" />
                    <h3 className="text-md font-semibold tracking-wide uppercase text-graphite-slate">
                      Interactive Savings Calculator
                    </h3>
                  </div>
                  <span className="text-xs text-mint-aqua font-bold uppercase tracking-wider">
                    Estimate Yearly Savings
                  </span>
                </div>

                <p className="text-xs text-graphite-slate font-light mb-6">
                  Select the treatments you or your family anticipate receiving over a 12-month period to compare standard versus membership costs.
                </p>

                {/* Treatment toggler checklist */}
                <div className="space-y-3 mb-8">
                  {treatments.map((treatment) => {
                    const isSelected = selectedItems.includes(treatment.id);
                    return (
                      <button
                        key={treatment.id}
                        onClick={() => handleToggle(treatment.id)}
                        className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border gap-4 transition-custom text-left ${
                          isSelected
                            ? "bg-mint-aqua/10 border-mint-aqua text-pure-white"
                            : "bg-primary-dark/30 border-pure-white/5 text-graphite-slate hover:border-pure-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              isSelected
                                ? "bg-mint-aqua border-mint-aqua text-primary-dark"
                                : "border-graphite-slate/40 text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div>
                            <span className={`text-sm font-medium ${isSelected ? "text-pure-white" : "text-graphite-slate/90"}`}>
                              {treatment.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 self-end sm:self-auto">
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-graphite-slate/60 uppercase tracking-widest">
                              Standard
                            </span>
                            <span className="text-xs line-through text-graphite-slate/70 font-medium">
                              ₹{treatment.standardPrice}
                            </span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-mint-aqua uppercase tracking-widest font-semibold">
                              Member
                            </span>
                            <span className="text-sm font-bold text-mint-aqua">
                              ₹{treatment.memberPrice}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculator Summary results */}
              <div className="bg-primary-dark/50 rounded-2xl p-4 sm:p-6 border border-pure-white/5 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] text-graphite-slate uppercase tracking-wider font-semibold">
                      Standard Cost
                    </span>
                    <span className="text-xl font-bold text-pure-white">
                      ₹{standardTotal}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-graphite-slate uppercase tracking-wider font-semibold">
                      Member Cost
                    </span>
                    <span className="text-xl font-bold text-pure-white">
                      ₹{memberTotal}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-graphite-slate uppercase tracking-wider font-semibold">
                      Plan Subscription
                    </span>
                    <span className="text-xl font-bold text-pure-white">
                      ₹{subscriptionCost}
                    </span>
                  </div>

                  <div className="flex flex-col bg-mint-aqua/10 p-3 rounded-xl border border-mint-aqua/20 items-start">
                    <span className="text-[9px] text-mint-aqua uppercase tracking-widest font-bold">
                      Your Savings
                    </span>
                    <span className="text-2xl font-black text-mint-aqua text-heading mt-0.5">
                      ₹{totalSavings}
                    </span>
                  </div>

                </div>

                {/* Micro animation: Savings Bar indicator */}
                {standardTotal > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between text-[10px] text-graphite-slate mb-1.5 font-semibold">
                      <span>SAVINGS RATIO</span>
                      <span className="text-mint-aqua">
                        {Math.round((totalSavings / standardTotal) * 100)}% Saved
                      </span>
                    </div>
                    <div className="w-full h-2 bg-primary-dark/70 rounded-full overflow-hidden border border-pure-white/5">
                      <motion.div
                        className="h-full bg-mint-aqua"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (totalSavings / standardTotal) * 100)}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

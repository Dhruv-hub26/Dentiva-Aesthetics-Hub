"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Shield, Layers, Check, Clock, DollarSign, ArrowUpRight } from "lucide-react";
import { Specialization } from "@/types";

const iconMap: Record<string, React.ComponentType<any>> = {
  Activity: Activity,
  Flame: Flame,
  Shield: Shield,
  Layers: Layers,
};

interface SpecializationGridProps {
  onSelectService: (serviceName: string, tier: 'Essential' | 'Aesthetic Pro' | 'Dentiva Signature') => void;
}

export default function SpecializationGrid({ onSelectService }: SpecializationGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const specializations: Specialization[] = [
    {
      id: "checkups",
      title: "Vibrant Checkups",
      tagline: "State-of-the-Art Diagnostics",
      description: "Detailed 3D intraoral imaging and digital health screening. Get an interactive preview of your alignment progression and oral health metrics.",
      benefits: ["Intraoral 3D scans", "Digital cavity mapping", "Oral cavity diagnostics", "Progression preview"],
      tier: "Essential",
      icon: "Activity",
      treatmentTime: "30-45 mins",
      cost: "$150",
      memberCost: "$30",
    },
    {
      id: "cleaning",
      title: "Revitalized Cleaning",
      tagline: "Ultrasonic Prophylaxis",
      description: "Micro-cleaning using laser scaling and air-flow polishing. Removes bio-film and tough stains without tooth sensitivity.",
      benefits: ["Ultrasonic scaling", "Air-flow polishing", "Enamel fluoridation", "Zero sensitivity tech"],
      tier: "Aesthetic Pro",
      icon: "Flame",
      treatmentTime: "60 mins",
      cost: "$220",
      memberCost: "$44",
    },
    {
      id: "fillings",
      title: "Reinforced Fillings",
      tagline: "Bio-Mimetic Restorations",
      description: "Composite fillings colored to match your tooth's exact light reflection. High-durability nano-composite structural bond.",
      benefits: ["Color-matched composite", "High durability ceramic", "Micro-invasive preparation", "BPA-free biomaterials"],
      tier: "Essential",
      icon: "Shield",
      treatmentTime: "45-75 mins",
      cost: "$350",
      memberCost: "$70",
    },
    {
      id: "aligners",
      title: "Digital Orthodontics",
      tagline: "Virtually Invisible Aligners",
      description: "Precision transparent aligner systems engineered using CAD/CAM simulations. Move teeth with 2x faster weekly alignment tracking and virtual clinical follow-ups.",
      benefits: ["Precision transparent trays", "Interactive 3D dental mapping", "Virtual weekly remote check-ins", "Predictable smile path"],
      tier: "Dentiva Signature",
      icon: "Layers",
      treatmentTime: "Consult + Design",
      cost: "$3,800",
      memberCost: "$760",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="specializations" className="py-24 bg-white text-primary-dark">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-mint-aqua font-bold text-xs uppercase tracking-widest block mb-3">
              Diagnostic & Therapy Focus
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-heading leading-tight text-primary-dark">
              Clinical Specializations <br />
              <span className="text-graphite-slate font-light">With 3D Dental Aesthetics</span>
            </h2>
          </div>
          <p className="text-graphite-slate text-sm md:text-base max-w-sm font-light leading-relaxed mt-4 md:mt-0 text-left">
            Select a specialized treatment service below. Members receive up to an 80% coverage adjustment on primary procedures.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {specializations.map((spec, index) => {
            const IconComponent = iconMap[spec.icon] || Activity;
            const isWide = index === 0 || index === 3;

            return (
              <motion.div
                key={spec.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(spec.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 transition-custom ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                } ${
                  hoveredCard === spec.id
                    ? "glassmorphism-card-light shadow-xl border-mint-aqua/30 bg-mint-aqua/5 translate-y-[-4px]"
                    : "bg-primary-dark/[0.02] border border-primary-dark/5"
                }`}
              >
                {/* Background design accents for hovered card */}
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(175,203,203,0.1),transparent_50%)] transition-opacity duration-500 ${
                    hoveredCard === spec.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Card Top Block */}
                <div>
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                        hoveredCard === spec.id
                          ? "bg-primary-dark text-mint-aqua"
                          : "bg-primary-dark/5 text-primary-dark"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Tier badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        spec.tier === "Dentiva Signature"
                          ? "bg-primary-dark text-mint-aqua"
                          : spec.tier === "Aesthetic Pro"
                          ? "bg-mint-aqua/20 text-primary-dark"
                          : "bg-primary-dark/5 text-graphite-slate"
                      }`}
                    >
                      {spec.tier}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="text-left">
                    <span className="text-xs font-semibold text-mint-aqua uppercase tracking-widest block mb-1">
                      {spec.tagline}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-heading text-primary-dark mb-4">
                      {spec.title}
                    </h3>
                    <p className="text-graphite-slate text-sm font-light leading-relaxed mb-6 max-w-xl">
                      {spec.description}
                    </p>
                  </div>

                  {/* Benefits checklist */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
                    {spec.benefits.map((benefit, bIndex) => (
                      <li key={bIndex} className="flex items-center gap-2.5 text-xs text-primary-dark/80">
                        <div className="w-4 h-4 rounded-full bg-mint-aqua/20 flex items-center justify-center text-primary-dark">
                          <Check className="w-3 h-3 text-primary-dark" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom Block: Pricing & Booking CTA */}
                <div className="border-t border-primary-dark/5 pt-6 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Prices */}
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-graphite-slate uppercase tracking-wider font-semibold">
                        Standard
                      </span>
                      <span className="text-sm font-medium line-through text-graphite-slate/75">
                        {spec.cost}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-mint-aqua font-bold uppercase tracking-wider">
                        Member Plan
                      </span>
                      <span className="text-xl font-bold text-primary-dark flex items-center">
                        {spec.memberCost}
                        <span className="text-[10px] text-graphite-slate font-normal ml-1">
                          (80% Off)
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => onSelectService(spec.title, spec.tier)}
                    className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                      hoveredCard === spec.id
                        ? "bg-primary-dark text-pure-white shadow-md"
                        : "bg-primary-dark/5 text-primary-dark hover:bg-primary-dark/10"
                    }`}
                  >
                    Select Tier
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

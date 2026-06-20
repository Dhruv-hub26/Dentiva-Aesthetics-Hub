"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Award, Star } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const statItemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] pt-32 pb-12 flex items-center justify-center bg-primary-dark overflow-hidden text-pure-white"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(175,203,203,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(130,140,141,0.08),transparent_50%)]" />

      {/* Animated subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#828C8D_1px,transparent_1px),linear-gradient(to_bottom,#828C8D_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-aqua/10 border border-mint-aqua/20 text-mint-aqua text-xs font-semibold uppercase tracking-wider mb-6 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium 3D Dental Aesthetics</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.08] mb-6"
          >
            Sculpting Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-aqua to-pure-white glow-mint">
              Perfect Alignment
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-graphite-slate max-w-xl mb-8 leading-relaxed font-light"
          >
            Experience the future of aesthetic dentistry. Merging the design brilliance of digital dental modeling with real-world precision to craft your custom smile path.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="flex items-center justify-center gap-2 bg-mint-aqua text-primary-dark hover:bg-mint-aqua/90 px-8 py-4 rounded-xl text-base font-bold tracking-wide transition-all shadow-[0_4px_20px_rgba(175,203,203,0.3)]"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <a
              href="#specializations"
              className="flex items-center justify-center gap-2 border border-pure-white/10 hover:border-pure-white/20 hover:bg-pure-white/5 text-pure-white px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all"
            >
              Explore Specializations
            </a>
          </motion.div>

          {/* Interactive Counter Elements */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-pure-white/10"
          >
            <motion.div variants={statItemVariants} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-mint-aqua text-heading">
                170+
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-graphite-slate mt-1 font-semibold">
                Surgeries Performed
              </span>
            </motion.div>

            <motion.div variants={statItemVariants} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-mint-aqua text-heading">
                85%
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-graphite-slate mt-1 font-semibold">
                Aesthetic Index
              </span>
            </motion.div>

            <motion.div variants={statItemVariants} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-mint-aqua text-heading">
                99.4%
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-graphite-slate mt-1 font-semibold">
                Satisfied Patients
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right 3D Media content */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[420px] rounded-3xl overflow-hidden glassmorphism-card-dark glow-mint flex items-center justify-center p-6 border border-pure-white/10"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-primary-dark/80 group">
              <Image
                src="/hero_showcase.png"
                alt="Dentiva 3D Dental Structure Alignment Mockup"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay shading for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#202A2C]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge 1 - Interactive Trust Info */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 glassmorphism-card-dark py-3 px-4 rounded-2xl flex items-center gap-3 shadow-lg border border-pure-white/10"
            >
              <div className="w-8 h-8 rounded-lg bg-mint-aqua/10 flex items-center justify-center text-mint-aqua">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-graphite-slate font-bold uppercase tracking-wider">
                  Accreditation
                </span>
                <span className="text-xs font-semibold text-pure-white">
                  ISO 9001 Certified
                </span>
              </div>
            </motion.div>

            {/* Floating Badge 2 - Interactive Satisfaction Index */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 glassmorphism-card-dark py-3 px-4 rounded-2xl flex items-center gap-3 shadow-lg border border-pure-white/10"
            >
              <div className="w-8 h-8 rounded-lg bg-mint-aqua/10 flex items-center justify-center text-mint-aqua animate-pulse">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-graphite-slate font-bold uppercase tracking-wider">
                  Awards
                </span>
                <span className="text-xs font-semibold text-pure-white flex items-center gap-1">
                  Top Aesthetic 2026 <Star className="w-3 h-3 fill-mint-aqua text-mint-aqua" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

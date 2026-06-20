"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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

  // Fixed standard inline structural object definition for strict TypeScript index signature compliance
  const badgeFloatTop: Variants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
      },
    },
  };

  const badgeFloatBottom: Variants = {
    animate: {
      y: [0, 12, 0],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] pt-32 pb-12 flex items-center justify-center bg-primary-dark overflow-hidden text-pure-white"
    >
      {/* Dynamic ambient radial gradients for seamless background blending */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(175,203,203,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(130,140,141,0.1),transparent_50%)]" />

      {/* Subtle background grid alignment lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#828C8D_1px,transparent_1px),linear-gradient(to_bottom,#828C8D_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Typography Block */}
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
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.1] mb-6 relative"
          >
            Sculpting Your <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-mint-aqua via-pure-white to-mint-aqua bg-[size:200%_auto] animate-pulse">
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
              className="flex items-center justify-center gap-2 bg-mint-aqua text-primary-dark hover:bg-mint-aqua/90 px-8 py-4 rounded-xl text-base font-bold tracking-wide transition-all shadow-[0_4px_20px_rgba(175,203,203,0.25)]"
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

          {/* Business Conversion Matrix */}
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

        {/* Right Media container with optimized depth parameters */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[420px] rounded-3xl p-3 bg-gradient-to-br from-pure-white/10 to-transparent border border-pure-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#202A2C] group">
              <Image
                src="/image.png"
                alt="Dentiva Cinematic Dental Showcase Layout"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Radial Vignette layer to seamlessly blend image bounds */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,7,0.4))]" />
            </div>

            {/* Top Floating Badge - Explicit Type Safe Binding */}
            <motion.div
              variants={badgeFloatTop}
              animate="animate"
              className="absolute -top-6 -left-6 bg-primary-dark/90 backdrop-blur-md py-3 px-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-pure-white/10 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-mint-aqua/10 flex items-center justify-center text-mint-aqua shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] text-graphite-slate font-bold uppercase tracking-wider">
                  Accreditation
                </span>
                <span className="text-xs font-semibold text-pure-white">
                  ISO 9001 Certified
                </span>
              </div>
            </motion.div>

            {/* Bottom Floating Badge - Explicit Type Safe Binding */}
            <motion.div
              variants={badgeFloatBottom}
              animate="animate"
              className="absolute -bottom-6 -right-6 bg-primary-dark/90 backdrop-blur-md py-3 px-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-pure-white/10 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-mint-aqua/10 flex items-center justify-center text-mint-aqua">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] text-graphite-slate font-bold uppercase tracking-wider">
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
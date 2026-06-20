"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Testimonial } from "@/types";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Dr. Alexander Wright",
      role: "Creative Director",
      content: "The intraoral 3D scan preview completely changed my expectations. Being able to visualize my alignment path on their digital interface made me proceed instantly. The signature treatment is a masterpiece.",
      rating: 5,
      treatment: "Digital Orthodontics",
    },
    {
      id: "t2",
      name: "Marcella Vane",
      role: "UX Principal Researcher",
      content: "Absolutely painless ultrasonic cleaning. The air-flow polishing felt like a spa treatment for my teeth, and the aesthetic attention of the clinic details is unmatched. Highest level of professionalism.",
      rating: 5,
      treatment: "Revitalized Cleaning",
    },
    {
      id: "t3",
      name: "Devon Miller",
      role: "Software Architect",
      content: "The bio-composite ceramic filling is indistinguishable from my natural teeth under any light reflection. Seamless structural bonding and absolutely zero postoperative sensitivity. Worth every penny.",
      rating: 5,
      treatment: "Reinforced Fillings",
    },
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-white text-primary-dark relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,203,203,0.06),transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-mint-aqua font-bold text-xs uppercase tracking-widest block mb-3">
            Patient Satisfaction Index
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-heading leading-tight text-primary-dark">
            Verified Clinical Reviews
          </h2>
          <div className="w-12 h-1 bg-mint-aqua mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonial slider window */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center flex flex-col items-center"
            >
              {/* Quote bubble container */}
              <div className="relative max-w-2xl px-8 md:px-12 py-10 rounded-3xl bg-primary-dark/[0.02] border border-primary-dark/5 shadow-sm mb-8">
                
                {/* Quote Icon overlay */}
                <Quote className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 text-mint-aqua bg-white p-2 rounded-full border border-primary-dark/5 shadow-sm" />
                
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-mint-aqua text-mint-aqua" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg md:text-xl font-light leading-relaxed text-primary-dark/90 italic">
                  "{activeTestimonial.content}"
                </p>

                {/* Service Tag */}
                <div className="inline-flex items-center gap-1.5 mt-6 px-3 py-1 rounded-full bg-mint-aqua/10 text-mint-aqua text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeTestimonial.treatment}</span>
                </div>
              </div>

              {/* Patient info */}
              <div className="text-center">
                <span className="block text-base font-bold text-primary-dark">
                  {activeTestimonial.name}
                </span>
                <span className="block text-xs text-graphite-slate uppercase tracking-wider font-semibold mt-0.5">
                  {activeTestimonial.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-10 max-w-xs mx-auto">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl border border-primary-dark/10 hover:border-primary-dark/20 flex items-center justify-center text-primary-dark hover:bg-primary-dark/5 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-6 bg-primary-dark" : "w-1.5 bg-primary-dark/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl border border-primary-dark/10 hover:border-primary-dark/20 flex items-center justify-center text-primary-dark hover:bg-primary-dark/5 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpecializationGrid from "@/components/SpecializationGrid";
import DiscountEngine from "@/components/DiscountEngine";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AppointmentScheduler from "@/components/AppointmentScheduler";

export default function Home() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTier, setSelectedTier] = useState<'Essential' | 'Aesthetic Pro' | 'Dentiva Signature' | "">("");

  const handleOpenScheduler = (service = "", tier: 'Essential' | 'Aesthetic Pro' | 'Dentiva Signature' | "" = "") => {
    setSelectedService(service);
    setSelectedTier(tier);
    setIsSchedulerOpen(true);
  };

  const handleCloseScheduler = () => {
    setIsSchedulerOpen(false);
    setSelectedService("");
    setSelectedTier("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Dynamic Glassmorphic Navbar */}
      <Navbar onBookClick={() => handleOpenScheduler("Vibrant Checkups", "Essential")} />

      <main className="flex-1">
        {/* Cinematic Hero Showcase */}
        <Hero onBookClick={() => handleOpenScheduler("Vibrant Checkups", "Essential")} />

        {/* Specialization Grid (Bento Style) */}
        <SpecializationGrid
          onSelectService={(serviceName, tierName) => handleOpenScheduler(serviceName, tierName)}
        />

        {/* Budget-Friendly Discount Engine */}
        <DiscountEngine />

        {/* Patient Review Testimonials Slider */}
        <Testimonials />
      </main>

      {/* Enterprise-grade Utility Footer */}
      <Footer />

      {/* Multi-step Appointment Booking Modal */}
      <AppointmentScheduler
        isOpen={isSchedulerOpen}
        onClose={handleCloseScheduler}
        selectedService={selectedService}
        selectedTier={selectedTier}
      />
    </div>
  );
}

export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  tier: 'Essential' | 'Aesthetic Pro' | 'Dentiva Signature';
  icon: string; // Lucide icon name
  treatmentTime: string;
  cost: string;
  memberCost: string; // 80% discount or special member pricing display
}

export interface Appointment {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  tier: 'Essential' | 'Aesthetic Pro' | 'Dentiva Signature';
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  treatment: string;
  avatarUrl?: string;
}

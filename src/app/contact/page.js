"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    travelWindow: "",
    guests: "2",
    budget: "$10,000 – $25,000",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="relative w-full h-[40vh] min-h-[320px] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-stone-950 opacity-90" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Dedicated Concierge Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Initiate Your Private Consultation
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Connect directly with our senior destination architects to commence drafting your bespoke itinerary.
          </p>
        </div>
      </section>

      {/* Main Consultation Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contacts & Concierge Bureaus */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
                Direct Communications
              </span>
              <h2 className="font-serif text-3xl font-normal text-stone-950 tracking-tight">
                Our Private Travel Studios
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Whether you have an established concept or seek open-ended inspiration, our itinerary curators are at your disposal.
              </p>
            </div>

            <div className="space-y-6 text-sm text-stone-700">
              <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-950">Concierge Telephone</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Toll-Free (North America & UK):</p>
                  <p className="font-semibold text-stone-900 mt-1">1-800-TRAVEL (1-800-872-835)</p>
                  <p className="text-xs text-stone-500 mt-1">International Private Dispatch: +1 (212) 555-8900</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-950">Confidential Enquiries</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Bespoke Journeys:</p>
                  <p className="font-semibold text-stone-900 mt-1">concierge@wanderlusttravel.com</p>
                  <p className="text-xs text-stone-500 mt-1">Response guaranteed within 12 business hours.</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-950">Operating Bureaus</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Monday – Friday: 08:00 – 20:00 (EST / GMT / SGT)<br />
                    Saturday: 10:00 – 16:00 (EST)<br />
                    <span className="text-amber-800 font-medium">In-country emergency dispatch active 24/7/365.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-xl font-normal text-stone-950">
                Studio Locations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white rounded-xl border border-stone-200/70">
                  <p className="font-semibold text-stone-900">New York</p>
                  <p className="text-stone-500 mt-1">575 Fifth Avenue</p>
                  <p className="text-stone-500">New York, NY 10017</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200/70">
                  <p className="font-semibold text-stone-900">London</p>
                  <p className="text-stone-500 mt-1">14 Berkeley Street</p>
                  <p className="text-stone-500">Mayfair, W1J 8DX</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200/70">
                  <p className="font-semibold text-stone-900">Singapore</p>
                  <p className="text-stone-500 mt-1">Marina Bay Financial</p>
                  <p className="text-stone-500">Tower 1, 018981</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Lead Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-stone-900 font-normal">
                  Inquiry Dispatched to Senior Curator
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{formData.firstName} {formData.lastName}</span>. Your consultation request for <span className="font-semibold text-stone-900">{formData.destination || "your custom trip"}</span> has been routed to our regional itinerary director.
                </p>
                <div className="p-5 bg-stone-50 rounded-2xl text-left text-xs text-stone-600 space-y-2 border border-stone-200/70 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Target Territory:</span>
                    <span className="font-semibold text-stone-900">{formData.destination || "To Be Advised"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Party Size:</span>
                    <span className="font-semibold text-stone-900">{formData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Target Window:</span>
                    <span className="font-semibold text-stone-900">{formData.travelWindow || "Flexible"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Target Budget Tier:</span>
                    <span className="font-semibold text-stone-900">{formData.budget}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      destination: "",
                      travelWindow: "",
                      guests: "2",
                      budget: "$10,000 – $25,000",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
                    Drafting Brief
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
                    Tell Us About Your Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Fields marked with an asterisk are required to pair you with the correct regional specialist.
                  </p>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">First Name *</label>
                    <Input
                      required
                      placeholder="e.g. Eleanor"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Last Name *</label>
                    <Input
                      required
                      placeholder="e.g. Vance"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Email Address *</label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. eleanor@vance.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Telephone Number *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Target Destination / Region</label>
                    <Input
                      placeholder="e.g. Kyoto, Tanzania, Greek Islands..."
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Preferred Travel Month / Year</label>
                    <Input
                      placeholder="e.g. October 2026 or Spring 2027"
                      value={formData.travelWindow}
                      onChange={(e) => setFormData({ ...formData, travelWindow: e.target.value })}
                      className="bg-stone-50/70 border-stone-200 text-sm"
                    />
                  </div>
                </div>

                {/* Party & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Travel Party Size</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full h-10 rounded-md border border-stone-200 bg-stone-50/70 px-3 text-sm text-stone-800 outline-none"
                    >
                      <option value="1">1 Solo Traveler</option>
                      <option value="2">2 Travelers (Couple / Duo)</option>
                      <option value="3-4">3–4 Travelers (Small Group)</option>
                      <option value="5-8">5–8 Travelers (Family)</option>
                      <option value="9+">9+ Travelers (Private Charter)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">Target Investment Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-10 rounded-md border border-stone-200 bg-stone-50/70 px-3 text-sm text-stone-800 outline-none"
                    >
                      <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                      <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                      <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                      <option value="$50,000+">$50,000+ (Ultra-Luxe / Private Aviation)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">
                    Passions, Milestones, or Particular Preferences
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about special occasions (anniversaries, honeymoons), preferred pace, dietary or mobility preferences, or must-see sights..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-md border border-stone-200 bg-stone-50/70 p-3 text-sm text-stone-800 outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict confidentiality guaranteed. No obligation.</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Submit Consultation Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Guidance & Protocols
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950">
              Frequently Addressed Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Essential details regarding our booking process, cancellation charters, and bespoke sequencing.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-lg font-medium text-stone-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-6 pt-2 bg-white text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    question: "How does the bespoke planning process work?",
    answer:
      "Upon receiving your inquiry, you are paired with a dedicated regional specialist. We schedule a 30-minute discovery conversation to uncover your preferred pace, passions, and travel cadence. Within 48 hours, we present an initial day-by-day draft with vetted luxury properties and private curators for your review and refinement.",
  },
  {
    question: "Can we modify properties and activities during the proposal phase?",
    answer:
      "Absolutely. Our itineraries are 100% bespoke. Nothing is locked until you are completely enamored with every single detail. We will refine lodging choices, adjust flight transitions, and tailor daily tempos until the itinerary fits you flawlessly.",
  },
  {
    question: "What is your cancellation and flexibility policy?",
    answer:
      "We operate with maximum flexibility. All deposits are protected, and cancellations made 60+ days prior to departure receive full refunds (less minor non-recoverable third-party permits). We also offer comprehensive trip interruption protection underwritten by Lloyd’s of London.",
  },
  {
    question: "Do you handle private aviation, helicopters, and yacht charters?",
    answer:
      "Yes. Our global operations department holds direct relationships with premier private jet brokers, scenic helicopter operators, and yacht charter managers worldwide, allowing seamless point-to-point transitions without commercial airport friction.",
  },
  {
    question: "What support is available while traveling in-country?",
    answer:
      "You are assigned a dedicated on-ground concierge accessible via private WhatsApp line and phone 24 hours a day. They monitor all flight changes, arrange priority dining reservations, and solve unforeseen logistics discreetly behind the scenes.",
  },
];

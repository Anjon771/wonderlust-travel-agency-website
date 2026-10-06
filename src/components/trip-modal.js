"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Calendar, Users, MapPin, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TripModal({ isOpen, onClose, trip }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !trip) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <Image
            src={trip.image || "/santorini.jpg"}
            alt={trip.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
              <span>{trip.location || "Featured Journey"}</span>
              <span aria-hidden="true">·</span>
              <span>{trip.duration || "Curated Itinerary"}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {trip.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-stone-900">
                Inquiry Received
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-stone-900">{formData.name || "valued traveler"}</span>. Our senior destination specialist for <span className="font-semibold text-stone-900">{trip.location || trip.name}</span> will contact you within 12 hours with a bespoke day-by-day itinerary proposal.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl text-left text-xs text-stone-600 space-y-1.5 border border-stone-200/60 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination:</span>
                  <span className="font-medium text-stone-900">{trip.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Base:</span>
                  <span className="font-medium text-stone-900">${trip.price ? trip.price.toLocaleString() : "Custom"} per guest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Party Size:</span>
                  <span className="font-medium text-stone-900">{formData.guests} Travelers</span>
                </div>
              </div>
              <Button
                onClick={handleReset}
                className="bg-stone-900 hover:bg-stone-800 text-white rounded-lg px-6 py-2.5 text-xs font-medium uppercase tracking-wider"
              >
                Close & Return
              </Button>
            </div>
          ) : (
            <>
              {/* Trip Overview */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200/80 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 block">Pricing</span>
                  <span className="font-serif text-2xl font-medium text-stone-900">
                    ${trip.price ? trip.price.toLocaleString() : "2,499"}
                  </span>
                  <span className="text-xs text-stone-500 ml-1">/ guest</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>{trip.duration || "Flexible Duration"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-700" />
                    <span>Private & Insured</span>
                  </div>
                </div>
              </div>

              {trip.description && (
                <p className="text-sm text-stone-600 leading-relaxed">
                  {trip.description}
                </p>
              )}

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Customize This Private Journey
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-sm bg-stone-50/50 border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. eleanor@wanderlust.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-sm bg-stone-50/50 border-stone-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-sm bg-stone-50/50 border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Travelers
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full h-9 rounded-md border border-stone-200 bg-stone-50/50 px-3 text-sm text-stone-800 outline-none"
                    >
                      <option value="1">1 Solo Traveler</option>
                      <option value="2">2 Travelers (Couple)</option>
                      <option value="3-4">3–4 Travelers (Small Group)</option>
                      <option value="5+">5+ Travelers (Family / Private Party)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Target Window
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Oct 2026 or Spring"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="text-sm bg-stone-50/50 border-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Special Requests or Preferred Pace (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Private vineyard access, dietary preferences, celebratory anniversary..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full rounded-md border border-stone-200 bg-stone-50/50 p-2.5 text-sm text-stone-800 outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-stone-500">
                    Complimentary proposal · No booking commitment required
                  </p>
                  <Button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Request Bespoke Proposal
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

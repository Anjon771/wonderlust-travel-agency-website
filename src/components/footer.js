"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Check, ArrowRight, ShieldCheck, Compass, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">Virtuoso Preferred Partner</p>
              <p className="text-stone-500">VIP upgrades, priority dining & private access</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">100% Carbon Offset Journeys</p>
              <p className="text-stone-500">Verified reforestation & local community investment</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-200">24/7 Dedicated Concierge</p>
              <p className="text-stone-500">In-country local liaisons throughout your voyage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-normal tracking-[0.2em] text-white uppercase">
                Wanderlust
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Pioneering private, high-fidelity luxury travel since 2005. Handcrafting bespoke itineraries across the world’s most breathtaking and secluded territories.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <p>Member of Traveller’s Century Club · ASTA Gold Standard</p>
              <p>Accredited International Tour Operator #882041</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-5">
              Destinations
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <Link href="/destinations?region=europe" className="hover:text-white transition-colors">
                  Mediterranean & Europe
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=asia" className="hover:text-white transition-colors">
                  Kyoto & East Asia
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=africa" className="hover:text-white transition-colors">
                  Serengeti & Southern Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=americas" className="hover:text-white transition-colors">
                  Andes & Latin America
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=oceania" className="hover:text-white transition-colors">
                  Polynesia & Oceania
                </Link>
              </li>
            </ul>
          </div>

          {/* Journeys */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-5">
              Experiences
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Private Expeditions
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Coastal Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Wildlife & Conservation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Specialists
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Private Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200">
              The Wanderlust Gazette
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curated dispatches, rare lodge openings, and private charter opportunities delivered monthly.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Welcome to the circle. Please check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-stone-900 border-stone-800 text-stone-100 placeholder:text-stone-500 text-xs h-9"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-stone-200 hover:bg-white text-stone-950 rounded-md text-xs font-medium shrink-0 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Strict confidentiality. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="border-t border-stone-900 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Wanderlust Curated Travel Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Privacy Charter
            </Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Sustainability Code
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

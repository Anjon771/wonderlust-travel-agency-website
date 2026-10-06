"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, PhoneCall } from "lucide-react";
import TripModal from "@/components/trip-modal";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const navLinks = [
    { name: "Destinations", path: "/destinations" },
    { name: "Journeys & Packages", path: "/packages" },
    { name: "Our Story", path: "/about" },
    { name: "Concierge & Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          {/* Zone 1: Brand title, one line, single text element */}
          <Link
            href="/"
            className="flex items-center gap-2 group tracking-widest"
          >
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-[0.2em] text-stone-900 uppercase">
              Wanderlust
            </span>
          </Link>

          {/* Zone 2: 4 clean nav links with subtle hover underlines */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-stone-950 font-semibold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:1800872835"
              className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-950 flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>1-800-TRAVEL</span>
            </a>
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Curate Your Journey
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:text-stone-950"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-1 ${
                    pathname === link.path
                      ? "text-stone-950 font-semibold"
                      : "text-stone-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
              <a
                href="tel:1800872835"
                className="text-xs uppercase tracking-wider text-stone-600 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>1-800-TRAVEL</span>
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCustomModalOpen(true);
                }}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-full text-center hover:bg-stone-800 transition-colors"
              >
                Curate Your Journey
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Consultation Modal */}
      <TripModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        trip={{
          name: "Bespoke Private Itinerary",
          location: "Worldwide Custom Destination",
          duration: "Tailored Duration",
          price: 3200,
          image: "/hero-luxury.jpg",
          description:
            "Work 1-on-1 with our master trip architects to design a bespoke journey curated entirely around your passions, travel cadence, and private accommodations.",
        }}
      />
    </>
  );
}

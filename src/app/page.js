"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Check,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Award,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TripModal from "@/components/trip-modal";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [modalTrip, setModalTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estimator State
  const [estimatorRegion, setEstimatorRegion] = useState("mediterranean");
  const [estimatorDays, setEstimatorDays] = useState(10);
  const [estimatorGuests, setEstimatorGuests] = useState(2);
  const [estimatorTier, setEstimatorTier] = useState("luxury");

  // Calculate estimated investment
  const estimatedTotal = useMemo(() => {
    const tierMultiplier = estimatorTier === "comfort" ? 420 : estimatorTier === "luxury" ? 780 : 1350;
    const regionBonus = estimatorRegion === "africa" ? 1.25 : estimatorRegion === "nordic" ? 1.2 : 1.0;
    const base = Math.round(estimatorDays * tierMultiplier * regionBonus);
    return base * estimatorGuests;
  }, [estimatorRegion, estimatorDays, estimatorGuests, estimatorTier]);

  const openTripModal = (trip) => {
    setModalTrip(trip);
    setIsModalOpen(true);
  };

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((d) => {
      const matchCategory =
        selectedCategory === "all" || d.category === selectedCategory;
      const matchSearch =
        searchDestination === "" ||
        d.name.toLowerCase().includes(searchDestination.toLowerCase()) ||
        d.location.toLowerCase().includes(searchDestination.toLowerCase());
      const matchSeason =
        selectedSeason === "all" || d.season === selectedSeason;
      return matchCategory && matchSearch && matchSeason;
    });
  }, [selectedCategory, searchDestination, selectedSeason]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-end bg-stone-950 overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0">
          <Image
            src="/hero-luxury.jpg"
            alt="Private luxury Mediterranean cliffside sanctuary at sunset"
            fill
            priority
            className="object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/45 to-stone-950/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-28 pb-16 lg:pb-24 flex flex-col justify-end">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium">
              <span>Private Expeditions</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Itineraries Since 2005</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] text-balance">
              Journeys Crafted Beyond the Ordinary
            </h1>

            <p className="text-base sm:text-xl text-stone-200/90 max-w-2xl font-light leading-relaxed">
              Private access, handpicked sanctuaries, and singular expeditions across the world’s most mesmerizing horizons.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() =>
                  openTripModal({
                    name: "Custom Tailored Expedition",
                    location: "Global Curated Journeys",
                    duration: "Flexible Duration",
                    price: 3500,
                    image: "/hero-luxury.jpg",
                    description: "Tell us where you wish to explore. Our dedicated regional architects will design every detail.",
                  })
                }
                className="px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-white hover:bg-stone-100 rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                Inquire With Concierge
              </button>
              <a
                href="#featured-destinations"
                className="px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-white border border-white/30 hover:bg-white/10 rounded-full transition-all duration-200 flex items-center gap-2"
              >
                Explore Destinations
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Condé Nast Traveler Gold List 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span>120+ Curated Global Territories</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Private & Carbon Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4.9/5 Rating Across 14,000+ Journeys</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE CURATION SEARCH FILTER BAR */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto w-full px-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-stone-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Destination / Region
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Greece, Kyoto, Andes..."
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>

            {/* Travel Season */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Season
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                >
                  <option value="all">Any Season</option>
                  <option value="Spring">Spring (Apr–Jun)</option>
                  <option value="Summer">Summer (Jul–Aug)</option>
                  <option value="Autumn">Autumn (Sep–Nov)</option>
                  <option value="Winter">Winter (Dec–Mar)</option>
                </select>
              </div>
            </div>

            {/* Travel Style */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Experience Style
              </label>
              <div className="relative">
                <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                >
                  <option value="all">All Styles</option>
                  <option value="coastal">Coastal Sanctuary</option>
                  <option value="cultural">Cultural Odyssey</option>
                  <option value="wilderness">Wilderness & Safari</option>
                  <option value="adventure">Alpine & Expedition</option>
                </select>
              </div>
            </div>

            {/* Reset / Search Actions */}
            <div className="flex items-end gap-2">
              <a
                href="#featured-destinations"
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-center text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Filter ({filteredDestinations.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              {(searchDestination || selectedSeason !== "all" || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchDestination("");
                    setSelectedSeason("all");
                    setSelectedCategory("all");
                  }}
                  className="py-2.5 px-3 text-xs text-stone-500 hover:text-stone-900 underline whitespace-nowrap cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS / CURATED COLLECTIONS */}
      <section id="featured-destinations" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Curated Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight">
              Featured Destinations
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl">
              Handpicked territories vetted by our destination curators for exceptional luxury, seclusion, and cultural resonance.
            </p>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl text-xs font-medium self-start md:self-end">
            {[
              { id: "all", label: "All Collections" },
              { id: "coastal", label: "Coastal" },
              { id: "cultural", label: "Cultural" },
              { id: "wilderness", label: "Wilderness" },
              { id: "adventure", label: "Expeditions" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-white text-stone-950 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
            <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl text-stone-900 mb-1">No destinations match your filter</h3>
            <p className="text-sm text-stone-500 mb-4">Try clearing your search terms or selecting another experience style.</p>
            <Button
              onClick={() => {
                setSearchDestination("");
                setSelectedSeason("all");
                setSelectedCategory("all");
              }}
              className="bg-stone-900 text-white text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.name}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Anchor */}
                <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Top Quiet Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-stone-950/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase">
                      {destination.styleLabel}
                    </span>
                    <span className="bg-stone-950/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium tabular-nums text-amber-300">
                      ★ {destination.rating}
                    </span>
                  </div>

                  {/* Bottom Text Over Scrim */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-medium tracking-wide mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{destination.location}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {destination.description}
                  </p>

                  {/* Metadata unboxed */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 border-t border-stone-100 pt-3">
                    <span>{destination.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>Season: {destination.season}</span>
                    <span aria-hidden="true">·</span>
                    <span>Private Villa</span>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 block">From</span>
                      <span className="font-serif text-2xl font-medium text-stone-950 tabular-nums">
                        ${destination.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 ml-1">/ person</span>
                    </div>
                    <button
                      onClick={() => openTripModal(destination)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 hover:text-white bg-stone-100 hover:bg-stone-950 rounded-lg transition-colors cursor-pointer"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-stone-900 border border-stone-300 hover:border-stone-900 bg-white rounded-full transition-colors"
          >
            <span>Browse Complete Portfolio ({allDestinations.length}+ Destinations)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. SIGNATURE MARQUEE EXPEDITIONS (High Contrast Asymmetric Spotlight) */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-amber-400">
              Exclusive Access
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Signature Marquee Journeys
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
              Rare wilderness lodges, chartered catamarans, and private estates inaccessible to standard commercial bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Spotlight 1: Nordic Aurora */}
            <div className="group relative bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 flex flex-col justify-between">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <Image
                  src="/aurora-expedition.jpg"
                  alt="Glass geodesic luxury dome under aurora borealis in Iceland"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-stone-950/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest text-emerald-300">
                    Nordic Remote · 7 Days
                  </span>
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                    Icelandic Aurora & Geothermal Sanctuary
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Private super-jeep glacier navigations, secluded geothermal lagoons, and overnight stays inside heated panoramic glass geodesic domes under the Northern Lights.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Glaciologist Guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Helicopter Fjord Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Secluded Geothermal Spa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Chef-Prepared Nordic Feast</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Investment</span>
                    <span className="font-serif text-2xl text-white font-medium tabular-nums">$4,850</span>
                    <span className="text-xs text-stone-400 ml-1">/ guest</span>
                  </div>
                  <button
                    onClick={() =>
                      openTripModal({
                        name: "Icelandic Aurora & Geothermal Sanctuary",
                        location: "Reykjavík & Southern Highlands, Iceland",
                        duration: "7 Days / 6 Nights",
                        price: 4850,
                        image: "/aurora-expedition.jpg",
                        description:
                          "An immersive expedition into Iceland’s primeval wilderness. Helicopter into secluded geothermal canyons, traverse massive glaciers, and retire beneath the aurora borealis.",
                      })
                    }
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-stone-950 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                  >
                    Inquire On Dates
                  </button>
                </div>
              </div>
            </div>

            {/* Spotlight 2: Serengeti Safari */}
            <div className="group relative bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 flex flex-col justify-between">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <Image
                  src="/safari-lodge.jpg"
                  alt="Serengeti luxury canvas safari suite at dawn"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-stone-950/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest text-amber-300">
                    Serengeti Conservation · 10 Days
                  </span>
                </div>
              </div>
              <div className="p-8 sm:p-10 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                    The Great Serengeti Migration & Crater Basin
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Exclusive mobility across private wildlife concessions, hot air balloon dawns over the savanna, and intimate canvas suites with personal master trackers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Private 4x4 & Lead Tracker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Hot Air Balloon Sunrise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Ngorongoro Crater Descent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>100% Conservation Offset</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Investment</span>
                    <span className="font-serif text-2xl text-white font-medium tabular-nums">$6,400</span>
                    <span className="text-xs text-stone-400 ml-1">/ guest</span>
                  </div>
                  <button
                    onClick={() =>
                      openTripModal({
                        name: "The Great Serengeti Migration & Crater Basin",
                        location: "Serengeti & Ngorongoro, Tanzania",
                        duration: "10 Days / 9 Nights",
                        price: 6400,
                        image: "/safari-lodge.jpg",
                        description:
                          "Witness Africa’s greatest wildlife drama from the comfort of ultra-secluded luxury camps. Led by world-class local naturalists with direct conservation access.",
                      })
                    }
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-stone-950 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                  >
                    Inquire On Dates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BESPOKE TRIP ESTIMATOR & INVESTMENT PLANNER */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Real-Time Itinerary Estimator</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  Calculate Your Custom Expedition Investment
                </h2>
                <p className="text-sm text-stone-400 mt-2">
                  Transparent estimation for fully private journeys including luxury accommodations, dedicated guides, in-country transfers, and bespoke experiences.
                </p>
              </div>

              {/* Control 1: Destination Territory */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-semibold block">
                  1. Select Target Territory
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "mediterranean", name: "Mediterranean" },
                    { id: "asia", name: "Japan & East Asia" },
                    { id: "africa", name: "East & South Africa" },
                    { id: "nordic", name: "Nordic & Arctic" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setEstimatorRegion(r.id)}
                      className={`p-3 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                        estimatorRegion === r.id
                          ? "bg-amber-500/10 border-amber-500 text-amber-300"
                          : "bg-stone-800/80 border-stone-700/60 text-stone-300 hover:border-stone-500"
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider text-stone-300 font-semibold">
                    2. Desired Duration
                  </span>
                  <span className="font-serif text-lg text-amber-300 font-medium tabular-nums">
                    {estimatorDays} Days / {estimatorDays - 1} Nights
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="21"
                  step="1"
                  value={estimatorDays}
                  onChange={(e) => setEstimatorDays(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>5 Days (Short Odyssey)</span>
                  <span>10 Days (Optimal)</span>
                  <span>21 Days (Grand Tour)</span>
                </div>
              </div>

              {/* Control 3: Guests & Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-300 font-semibold block">
                    3. Number of Travelers
                  </label>
                  <select
                    value={estimatorGuests}
                    onChange={(e) => setEstimatorGuests(parseInt(e.target.value))}
                    className="w-full h-11 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 px-3 text-sm outline-none"
                  >
                    <option value="1">1 Guest (Solo Private)</option>
                    <option value="2">2 Guests (Couple / Duo)</option>
                    <option value="4">4 Guests (Family / Friends)</option>
                    <option value="6">6 Guests (Private Party)</option>
                    <option value="8">8 Guests (Charter Group)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-300 font-semibold block">
                    4. Accommodation Tier
                  </label>
                  <select
                    value={estimatorTier}
                    onChange={(e) => setEstimatorTier(e.target.value)}
                    className="w-full h-11 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 px-3 text-sm outline-none"
                  >
                    <option value="comfort">Curated Heritage & 5-Star</option>
                    <option value="luxury">Boutique Luxury & Villas</option>
                    <option value="ultraluxe">Ultra-Luxe & Private Estates</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-stone-950/90 rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-6">
              <div className="pb-4 border-b border-stone-800/80">
                <span className="text-xs uppercase tracking-widest text-stone-400 block mb-1">
                  Estimated Total Investment
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-normal text-white tabular-nums">
                    ${estimatedTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-400">Total Party</span>
                </div>
                <p className="text-xs text-stone-500 mt-1 tabular-nums">
                  Approx. ${(Math.round(estimatedTotal / estimatorGuests)).toLocaleString()} per guest for {estimatorDays} days
                </p>
              </div>

              {/* Inclusions Breakdown */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-semibold block">
                  Included In Every Bespoke Proposal:
                </span>
                <ul className="space-y-2 text-xs text-stone-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Private licensed guides & heritage historians</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>All internal domestic air & private chauffeurs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Curated daily breakfasts & signature gastronomy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>24/7 dedicated in-country concierge liaison</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openTripModal({
                    name: `Custom ${estimatorDays}-Day ${estimatorRegion.toUpperCase()} Odyssey`,
                    location: `${estimatorRegion.toUpperCase()} Curated Circuit`,
                    duration: `${estimatorDays} Days / ${estimatorDays - 1} Nights`,
                    price: Math.round(estimatedTotal / estimatorGuests),
                    image: "/hero-luxury.jpg",
                    description: `Customized itinerary proposal configured for ${estimatorGuests} travelers over ${estimatorDays} days at ${estimatorTier} tier.`,
                  })
                }
                className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer text-center shadow-lg"
              >
                Inquire With These Parameters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE WANDERLUST ETHOS / 4 EDITORIAL PILLARS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 w-full border-t border-stone-200/60">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight">
            How We Travel Differently
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            We avoid mass-tourism corridors, commercial coach tours, and off-the-shelf packages in favor of thoughtful, slow, and private immersion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Private Custodians",
              desc: "Guides chosen not for rote recitation, but for their deep ties as local archaeologists, maritime skippers, culinary artisans, and wildlife conservationists.",
            },
            {
              num: "02",
              title: "Exclusive Sanctuaries",
              desc: "From restored cliffside palazzos to secluded canvas pavilions in private conservancies, we prioritize properties with soul, architectural beauty, and complete privacy.",
            },
            {
              num: "03",
              title: "24/7 On-Ground Concierge",
              desc: "A personal point of contact on WhatsApp and telephone who manages seamless luggage transfers, spontaneous reservations, and flight adjustments in real time.",
            },
            {
              num: "04",
              title: "Regenerative Impact",
              desc: "Every journey contributes directly to local preservation trusts. We calculate and offset 100% of our carbon footprint with certified Gold Standard credits.",
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 bg-white rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-6 hover:border-stone-400 transition-colors"
            >
              <span className="font-serif text-3xl font-light text-amber-700/80">
                {pillar.num}
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRAVELER STORIES / VERIFIED TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-stone-100/60 border-t border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
              Client Dispatches
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight">
              Stories From Our Travelers
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Reflections from discerning travelers who trusted us with their milestone vacations, sabbaticals, and private expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-sm text-stone-700 font-serif italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-stone-900">{t.name}</h4>
                    <p className="text-xs text-stone-500">{t.itinerary}</p>
                    <p className="text-[11px] text-amber-800 font-medium">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL LEAD CONCIERGE CALLOUT */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white p-8 sm:p-14 lg:p-16">
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/travel-team-bg.avif"
              alt="Wanderlust private travel studio"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              Private Consultation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              Begin Planning With a Dedicated Regional Architect
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              Every Wanderlust journey begins with a private conversation. Share your target travel window, passions, and family cadence with our team.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-white text-stone-950 hover:bg-stone-200 rounded-full transition-colors"
              >
                Schedule Private Consultation
              </Link>
              <Link
                href="/packages"
                className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-stone-700 hover:bg-stone-900 rounded-full transition-colors"
              >
                View 2026 Itineraries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Modal */}
      <TripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trip={modalTrip}
      />
    </div>
  );
}

// Full curated data
const allDestinations = [
  {
    name: "Santorini & Cyclades",
    location: "Greece",
    image: "/santorini.jpg",
    rating: "4.96",
    duration: "7 Days / 6 Nights",
    season: "Summer",
    category: "coastal",
    styleLabel: "Coastal Sanctuary",
    price: 2490,
    description:
      "Private cliffside villa in Oia with private catamaran charter around the volcanic caldera, ancient Akrotiri private access, and sunset wine tastings.",
  },
  {
    name: "Kyoto & Mount Fuji",
    location: "Japan",
    image: "/tokyo.jpg",
    rating: "4.98",
    duration: "10 Days / 9 Nights",
    season: "Spring",
    category: "cultural",
    styleLabel: "Cultural Odyssey",
    price: 3680,
    description:
      "Exclusive ryokan reservations with private onsen, after-hours temple visits with Buddhist monks, and private tea master ceremonies.",
  },
  {
    name: "Maldives Overwater Lagoon",
    location: "Indian Ocean",
    image: "/maldives.jpg",
    rating: "4.95",
    duration: "6 Days / 5 Nights",
    season: "Winter",
    category: "coastal",
    styleLabel: "Private Island",
    price: 3890,
    description:
      "Secluded ocean villas with personal marine biologist for manta ray diving, private sandbank dinners, and luxury seaplane transfers.",
  },
  {
    name: "Machu Picchu & Sacred Valley",
    location: "Peru",
    image: "/machu-picchu.jpg",
    rating: "4.92",
    duration: "9 Days / 8 Nights",
    season: "Autumn",
    category: "adventure",
    styleLabel: "Heritage Trek",
    price: 2890,
    description:
      "Hiram Bingham luxury train passage, dawn access to the citadel before public crowds, and high-altitude Andean gastronomy with Master Chefs.",
  },
  {
    name: "Serengeti & Ngorongoro",
    location: "Tanzania",
    image: "/african-safari.jpg",
    rating: "4.99",
    duration: "10 Days / 9 Nights",
    season: "Summer",
    category: "wilderness",
    styleLabel: "Wilderness Safari",
    price: 5200,
    description:
      "Private tented camps following the great migration corridors, dawn hot air balloon flights, and master trackers in custom open-sided cruisers.",
  },
  {
    name: "Parisian Salon & Champagne",
    location: "France",
    image: "/paris.jpg",
    rating: "4.89",
    duration: "6 Days / 5 Nights",
    season: "Autumn",
    category: "cultural",
    styleLabel: "Urban Atelier",
    price: 2650,
    description:
      "Private viewing at Musée d’Orsay before opening, private cellar tastings in Épernay, and luxury suite in Saint-Germain-des-Prés.",
  },
  {
    name: "Bali Highlands & Coast",
    location: "Indonesia",
    image: "/bali.webp",
    rating: "4.91",
    duration: "9 Days / 8 Nights",
    season: "Spring",
    category: "coastal",
    styleLabel: "Wellness Sanctuary",
    price: 2150,
    description:
      "Ubud jungle estate overlooking river valleys, holistic Ayurvedic healers, and private cliffside villas in Uluwatu with private beach access.",
  },
  {
    name: "Patagonian Glaciers & Fjords",
    location: "Chile & Argentina",
    image: "/peruvian-andes.jpg",
    rating: "4.94",
    duration: "11 Days / 10 Nights",
    season: "Winter",
    category: "adventure",
    styleLabel: "Remote Expedition",
    price: 4400,
    description:
      "Torres del Paine private eco-lodges, private yacht navigation to ice fields, and horseback expeditions across golden estancia pampas.",
  },
];

const testimonials = [
  {
    name: "Alexandra & Marcus Thorne",
    itinerary: "Kyoto & Mount Fuji Ryokan Odyssey",
    date: "Travelled April 2026",
    rating: 5,
    avatar: "/user1.jpg",
    quote:
      "Wanderlust orchestrated an experience that felt utterly untouchable by ordinary tourists. Having private access to Daitoku-ji with a Zen monk at sunrise will remain etched in our memories forever.",
  },
  {
    name: "Dr. Julian Sterling",
    itinerary: "Serengeti Migration & Private Concession",
    date: "Travelled August 2025",
    rating: 5,
    avatar: "/user2.jpg",
    quote:
      "The level of attention to logistics is unparalleled. Our lead tracker knew every leopard territory, our camp was relocated seamlessly, and the conservation focus was genuine and inspiring.",
  },
  {
    name: "Elena Rostova",
    itinerary: "Santorini & Private Cyclades Charter",
    date: "Travelled June 2025",
    rating: 5,
    avatar: "/user3.jpg",
    quote:
      "From the moment we landed in Athens to our private catamaran sunset in Oia, every single transfer and dinner reservation was executed with discreet perfection.",
  },
];

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Clock,
  Check,
  MapPin,
  Search,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TripModal from "@/components/trip-modal";

export default function PackagesPage() {
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalTrip, setModalTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTripModal = (pkg) => {
    setModalTrip(pkg);
    setIsModalOpen(true);
  };

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const matchStyle =
        selectedStyle === "all" || pkg.style.toLowerCase() === selectedStyle.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDuration =
        selectedDuration === "all" ||
        (selectedDuration === "short" && pkg.days <= 7) ||
        (selectedDuration === "medium" && pkg.days > 7 && pkg.days <= 10) ||
        (selectedDuration === "long" && pkg.days > 10);
      return matchStyle && matchSearch && matchDuration;
    });
  }, [selectedStyle, selectedDuration, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="relative w-full h-[45vh] min-h-[360px] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        <Image
          src="/travel-package.jpg"
          alt="Curated travel packages and expeditions"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Private & Small-Party Circuits
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Curated Journeys & Circuits
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Meticulously sequenced itineraries featuring private aviation transfers, signature boutique sanctuaries, and access to the world’s most respected curators.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search packages by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            {/* Travel Style Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Styles" },
                { id: "cultural", label: "Cultural" },
                { id: "adventure", label: "Expedition" },
                { id: "wildlife", label: "Wildlife & Safari" },
                { id: "nature", label: "Nature & Wilderness" },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedStyle === style.id
                      ? "bg-stone-900 text-white font-medium shadow-sm"
                      : "bg-stone-100 text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="h-9 px-3 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-800 outline-none w-full md:w-auto"
              >
                <option value="all">Any Duration</option>
                <option value="short">1–7 Days (Short Circuit)</option>
                <option value="medium">8–10 Days (Optimal)</option>
                <option value="long">11+ Days (Extended Odyssey)</option>
              </select>

              {(searchQuery || selectedStyle !== "all" || selectedDuration !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStyle("all");
                    setSelectedDuration("all");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 underline px-2 whitespace-nowrap cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1">
        <div className="flex justify-between items-center mb-8 text-xs text-stone-500">
          <span>
            Displaying <strong className="text-stone-900">{filteredPackages.length}</strong> master itineraries
          </span>
          <span className="hidden sm:inline">All circuits include private vehicle & concierge support</span>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
            <Compass className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-stone-900 mb-2">No packages match current filters</h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
              Our travel specialists design completely tailored circuits. Inquire to build an itinerary tailored specifically to your dates.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedStyle("all");
                setSelectedDuration("all");
              }}
              className="bg-stone-900 text-white text-xs uppercase tracking-wider"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-stone-950/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase">
                      {pkg.styleLabel}
                    </span>
                    <span className="bg-stone-950/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium tabular-nums text-amber-300">
                      ★ {pkg.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-medium mb-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.location}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-white">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  {/* Meta Strip */}
                  <div className="flex items-center gap-4 text-xs text-stone-500 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-800" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-800" />
                      <span>{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-800" />
                      <span>Season: {pkg.season}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block">
                      Curated Inclusions:
                    </span>
                    <ul className="space-y-2 text-xs text-stone-600">
                      {pkg.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 block">From</span>
                      <span className="font-serif text-2xl font-medium text-stone-950 tabular-nums">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 ml-1">/ person</span>
                    </div>
                    <button
                      onClick={() => openTripModal(pkg)}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      Inquire / Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Travel Style Showcase */}
        <div className="mt-24 pt-16 border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Thematic Passions
            </span>
            <h2 className="font-serif text-3xl font-normal text-stone-950">
              Explore by Travel Cadence
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Whether you crave heart-pounding high-altitude ascents or quiet meditative coastal retreats.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {travelStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className="group relative h-48 rounded-xl overflow-hidden text-left cursor-pointer border border-stone-200"
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-normal text-white">{style.name}</h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1">{style.description}</p>
                </div>
              </button>
            ))}
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

const allPackages = [
  {
    name: "Greek Islands Explorer & Caldera Charter",
    location: "Athens, Mykonos, & Santorini, Greece",
    days: 10,
    duration: "10 Days / 9 Nights",
    groupSize: "Private / Max 8",
    season: "May–Oct",
    price: 2850,
    style: "cultural",
    styleLabel: "Coastal & Cultural",
    image: "/santorini.jpg",
    rating: "4.95",
    highlights: [
      "Private sunset catamaran charter inside Santorini caldera",
      "Exclusive guided access to ancient Akrotiri excavations",
      "Cliffside boutique cave suites overlooking the Aegean",
      "Private helicopter transfer between Mykonos and Santorini",
    ],
  },
  {
    name: "Japan Cultural Odyssey & Ryokan Trail",
    location: "Tokyo, Kyoto, Hakone, Japan",
    days: 12,
    duration: "12 Days / 11 Nights",
    groupSize: "Private / Max 6",
    season: "Year Round",
    price: 3650,
    style: "cultural",
    styleLabel: "Heritage & Living Culture",
    image: "/japan-cultural.jpg",
    rating: "4.98",
    highlights: [
      "Overnight stays in historic sukiya-style ryokan with private onsens",
      "Private tea master ceremony inside closed Kyoto temple precincts",
      "Mount Fuji helicopter scenic flyover and lake cruise",
      "After-hours private sushi omakase with Michelin master chefs",
    ],
  },
  {
    name: "Costa Rica Rainforest Canopy & Volcano",
    location: "Arenal & Manuel Antonio, Costa Rica",
    days: 8,
    duration: "8 Days / 7 Nights",
    groupSize: "Private / Max 8",
    season: "Dec–Apr",
    price: 2190,
    style: "adventure",
    styleLabel: "Canopy & Eco-Luxe",
    image: "/costa-rica-adventure.jpg",
    rating: "4.89",
    highlights: [
      "Private thermal plunge villas fronting Arenal Volcano",
      "Private biologist-guided night walks for tree frogs and sloths",
      "White-water rafting and secluded Pacific catamaran sailing",
      "Direct investment into local reforestation preserves",
    ],
  },
  {
    name: "Italian Highlights: Amalfi & Tuscany",
    location: "Florence, Chianti, & Positano, Italy",
    days: 9,
    duration: "9 Days / 8 Nights",
    groupSize: "Private / Max 8",
    season: "Apr–Oct",
    price: 2950,
    style: "cultural",
    styleLabel: "Gastronomy & Heritage",
    image: "/italian.webp",
    rating: "4.92",
    highlights: [
      "Private estate villa in Chianti with personal olive oil sommelier",
      "Private Riva boat charter along the cliffs of Positano and Capri",
      "Exclusive before-hours entry to the Uffizi Gallery in Florence",
      "Truffle hunting expedition with heritage hound handlers",
    ],
  },
  {
    name: "Peruvian Andes & Sacred Citadel",
    location: "Cusco, Sacred Valley, & Machu Picchu, Peru",
    days: 10,
    duration: "10 Days / 9 Nights",
    groupSize: "Private / Max 6",
    season: "May–Oct",
    price: 2790,
    style: "adventure",
    styleLabel: "Andean Heritage",
    image: "/peruvian-andes.jpg",
    rating: "4.94",
    highlights: [
      "Belmond Hiram Bingham vintage luxury rail transit",
      "Early dawn private entry to Machu Picchu citadel with archaeologist",
      "Weaving atelier masterclasses with high-Andean indigenous elders",
      "High-altitude Andean dining experiences curated by master chefs",
    ],
  },
  {
    name: "South African Safari & Cape Winelands",
    location: "Sabi Sands & Franschhoek, South Africa",
    days: 10,
    duration: "10 Days / 9 Nights",
    groupSize: "Private / Max 6",
    season: "Year Round",
    price: 4950,
    style: "wildlife",
    styleLabel: "Big Five & Terroir",
    image: "/african-safari.jpg",
    rating: "4.99",
    highlights: [
      "Private open-vehicle game drives with world-class master trackers",
      "Luxury canvas suites suspended over active waterholes",
      "Helicopter flyover of Cape Peninsula and private wine cellar tours",
      "Full carbon-offset and anti-poaching patrol contribution",
    ],
  },
  {
    name: "Icelandic Glaciers & Aurora Igloos",
    location: "Golden Circle & Vatnajökull, Iceland",
    days: 7,
    duration: "7 Days / 6 Nights",
    groupSize: "Private / Max 6",
    season: "Oct–Mar",
    price: 4850,
    style: "nature",
    styleLabel: "Arctic & Thermal",
    image: "/iceland-adventure.webp",
    rating: "4.96",
    highlights: [
      "Heated glass geodesic dome sleepout beneath the aurora borealis",
      "Super-jeep traversal onto massive blue ice glacier caverns",
      "Private geothermal lagoon soak reserved exclusively for your party",
      "Expert glaciologist and astrophotographer guidance",
    ],
  },
  {
    name: "Moroccan Imperial Cities & Sahara Camp",
    location: "Marrakech, Fes, & Erg Chebbi, Morocco",
    days: 8,
    duration: "8 Days / 7 Nights",
    groupSize: "Private / Max 8",
    season: "Oct–Apr",
    price: 2450,
    style: "cultural",
    styleLabel: "Imperial & Desert",
    image: "/moroccan.png",
    rating: "4.88",
    highlights: [
      "Private luxury Berber canvas camp amid soaring Erg Chebbi dunes",
      "Exclusive guided tours through the historic Fes medina ateliers",
      "Private riad suites with courtyard orange blossoms in Marrakech",
      "Sunset camel caravan trek and starlit oud musical performance",
    ],
  },
  {
    name: "Vietnam & Cambodia Waterway Odyssey",
    location: "Ha Long Bay, Siem Reap, & Mekong, SE Asia",
    days: 14,
    duration: "14 Days / 13 Nights",
    groupSize: "Private / Max 8",
    season: "Nov–Apr",
    price: 3490,
    style: "cultural",
    styleLabel: "River & Temple",
    image: "/vietnam-and-cambodia.jpg",
    rating: "4.91",
    highlights: [
      "Private boutique wooden junk cruise across Lan Ha Bay",
      "Angkor Wat sunrise access accompanied by epigraphy scholars",
      "Slow luxury private riverboat journey along the lower Mekong",
      "Culinary market explorations with resident culinary masters",
    ],
  },
];

const travelStyles = [
  { id: "adventure", name: "Alpine & Expeditions", description: "Remote summits and ancient trails", image: "/adventure.jpg" },
  { id: "coastal", name: "Coastal Sanctuaries", description: "Secluded islands and private coves", image: "/beach.jpg" },
  { id: "cultural", name: "Cultural Immersion", description: "Ancient rituals and private ateliers", image: "/cultural.jpg" },
  { id: "wildlife", name: "Wildlife & Safari", description: "Rare conservation encounters", image: "/wildlife.jpg" },
];

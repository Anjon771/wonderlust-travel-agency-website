"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal, ArrowRight, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripModal from "@/components/trip-modal";

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [sortBy, setSortBy] = useState("curated");
  const [modalTrip, setModalTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTripModal = (trip) => {
    setModalTrip(trip);
    setIsModalOpen(true);
  };

  const filteredDestinations = useMemo(() => {
    let list = allDestinations.filter((d) => {
      const matchSearch =
        searchQuery === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion =
        selectedRegion === "all" || d.region.toLowerCase() === selectedRegion.toLowerCase();
      const matchStyle =
        selectedStyle === "all" || d.style.toLowerCase() === selectedStyle.toLowerCase();
      return matchSearch && matchRegion && matchStyle;
    });

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return list;
  }, [searchQuery, selectedRegion, selectedStyle, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="relative w-full h-[45vh] min-h-[360px] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        <Image
          src="/destinations-bg.webp"
          alt="World destinations panoramic view"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Global Curated Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Destinations & Territories
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            From secluded Aegean archipelagos to misty Andean citadels, discover our vetted private sanctuaries across seven continents.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search territories, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-9 px-3 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-800 outline-none"
              >
                <option value="all">All Regions</option>
                <option value="europe">Europe & Mediterranean</option>
                <option value="asia">Asia & Pacific</option>
                <option value="americas">Americas & Andes</option>
                <option value="africa">Africa & Safari</option>
                <option value="oceania">Oceania & Polynesia</option>
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="h-9 px-3 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-800 outline-none"
              >
                <option value="all">All Travel Styles</option>
                <option value="coastal">Coastal Sanctuary</option>
                <option value="cultural">Cultural Immersion</option>
                <option value="wilderness">Wilderness & Nature</option>
                <option value="adventure">Alpine & Trekking</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 text-xs bg-stone-50 rounded-lg border border-stone-200 text-stone-800 outline-none"
              >
                <option value="curated">Curated Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {(searchQuery || selectedRegion !== "all" || selectedStyle !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRegion("all");
                    setSelectedStyle("all");
                    setSortBy("curated");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 underline px-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1">
        <div className="flex justify-between items-center mb-8 text-xs text-stone-500">
          <span>
            Showing <strong className="text-stone-900">{filteredDestinations.length}</strong> vetted sanctuaries
          </span>
          <span className="hidden sm:inline">100% Private Departures · Fully Customizable</span>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
            <Compass className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-stone-900 mb-2">No matching destinations found</h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
              We frequently design bespoke journeys to unlisted territories. Inquire with our concierge to arrange custom routes.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
                setSelectedStyle("all");
              }}
              className="bg-stone-900 text-white text-xs uppercase tracking-wider"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((d) => (
              <div
                key={d.name}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-stone-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase">
                      {d.region}
                    </span>
                    <span className="bg-stone-950/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-medium tabular-nums text-amber-300">
                      ★ {d.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[11px] text-amber-200/90 mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{d.location}</span>
                    </div>
                    <h3 className="font-serif text-xl font-normal text-white truncate">
                      {d.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {d.description}
                  </p>

                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5 border-t border-stone-100 pt-2.5">
                    <span>{d.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>Best: {d.season}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 block">From</span>
                      <span className="font-serif text-xl font-medium text-stone-950 tabular-nums">
                        ${d.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-stone-500 ml-1">/ guest</span>
                    </div>
                    <button
                      onClick={() => openTripModal(d)}
                      className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-950 hover:text-white bg-stone-100 hover:bg-stone-950 rounded-lg transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore By Regional Continents */}
        <div className="mt-24 pt-16 border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Regional Portfolios
            </span>
            <h2 className="font-serif text-3xl font-normal text-stone-950">
              Explore by Geographic Territory
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Each geographic division is headed by dedicated on-ground architects who live in the region.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className="group relative h-48 rounded-xl overflow-hidden text-left cursor-pointer border border-stone-200"
              >
                <Image
                  src={reg.image}
                  alt={reg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-normal text-white">{reg.name}</h3>
                  <p className="text-[11px] text-amber-300">{reg.count} Sanctuaries</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Itinerary Lead Callout */}
        <div className="mt-20 p-8 sm:p-12 bg-white rounded-3xl border border-stone-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              Bespoke Private Drafting
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal">
              Seeking an Unlisted Territory or Multi-Country Route?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our regional directors frequently curate private rail passages, multi-country African circuits, and secluded yacht charters across private islands.
            </p>
          </div>
          <button
            onClick={() =>
              openTripModal({
                name: "Custom Multi-Country Circuit",
                location: "Tailored Worldwide Itinerary",
                duration: "Custom Window",
                price: 4500,
                image: "/destinations-bg.webp",
                description:
                  "Work directly with our lead itinerary director to assemble a seamless private multi-region circuit.",
              })
            }
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-full shrink-0 shadow-sm cursor-pointer"
          >
            Request Custom Circuit
          </button>
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

const allDestinations = [
  {
    name: "Santorini & Cyclades",
    location: "Greece",
    region: "europe",
    style: "coastal",
    image: "/santorini.jpg",
    rating: "4.96",
    duration: "7 Days / 6 Nights",
    season: "Summer",
    price: 2490,
    description: "Private cliffside villa in Oia with private catamaran charter around the caldera.",
  },
  {
    name: "Kyoto & Mount Fuji",
    location: "Japan",
    region: "asia",
    style: "cultural",
    image: "/tokyo.jpg",
    rating: "4.98",
    duration: "10 Days / 9 Nights",
    season: "Spring",
    price: 3680,
    description: "Exclusive ryokan stays, private onsen, after-hours temple visits with monks.",
  },
  {
    name: "Maldives Overwater Lagoon",
    location: "Indian Ocean",
    region: "asia",
    style: "coastal",
    image: "/maldives.jpg",
    rating: "4.95",
    duration: "6 Days / 5 Nights",
    season: "Winter",
    price: 3890,
    description: "Private overwater villa with personal marine biologist and seaplane transfers.",
  },
  {
    name: "Machu Picchu & Sacred Valley",
    location: "Peru",
    region: "americas",
    style: "adventure",
    image: "/machu-picchu.jpg",
    rating: "4.92",
    duration: "9 Days / 8 Nights",
    season: "Autumn",
    price: 2890,
    description: "Hiram Bingham luxury train, dawn access to citadel, high-altitude gastronomy.",
  },
  {
    name: "Parisian Salon & Champagne",
    location: "France",
    region: "europe",
    style: "cultural",
    image: "/paris.jpg",
    rating: "4.89",
    duration: "6 Days / 5 Nights",
    season: "Autumn",
    price: 2650,
    description: "Private museum tours after dark and historic Grand Cru cellar tastings in Épernay.",
  },
  {
    name: "Serengeti & Ngorongoro",
    location: "Tanzania",
    region: "africa",
    style: "wilderness",
    image: "/african-safari.jpg",
    rating: "4.99",
    duration: "10 Days / 9 Nights",
    season: "Summer",
    price: 5200,
    description: "Exclusive tented migration camps, balloon dawns, private tracker in open cruiser.",
  },
  {
    name: "Barcelona & Costa Brava",
    location: "Spain",
    region: "europe",
    style: "cultural",
    image: "/barcelona.jpg",
    rating: "4.87",
    duration: "7 Days / 6 Nights",
    season: "Spring",
    price: 2200,
    description: "Private architectural access to Gaudí monuments and secluded Mediterranean cove sailing.",
  },
  {
    name: "Cape Town & Winelands",
    location: "South Africa",
    region: "africa",
    style: "coastal",
    image: "/cape-town.jpg",
    rating: "4.91",
    duration: "8 Days / 7 Nights",
    season: "Spring",
    price: 2950,
    description: "Table Mountain helicopter descent, private Franschhoek cellar master tastings.",
  },
  {
    name: "Bali Highlands & Uluwatu",
    location: "Indonesia",
    region: "asia",
    style: "coastal",
    image: "/bali.webp",
    rating: "4.91",
    duration: "9 Days / 8 Nights",
    season: "Summer",
    price: 2150,
    description: "Private jungle estates, river canyon wellness retreats, and clifftop sunset pavilions.",
  },
  {
    name: "Patagonian Fjords & Peaks",
    location: "Chile & Argentina",
    region: "americas",
    style: "adventure",
    image: "/peruvian-andes.jpg",
    rating: "4.94",
    duration: "11 Days / 10 Nights",
    season: "Winter",
    price: 4400,
    description: "Torres del Paine private eco-lodges and yacht expedition among monumental glaciers.",
  },
  {
    name: "Icelandic Glaciers & Aurora",
    location: "Iceland",
    region: "europe",
    style: "adventure",
    image: "/iceland-adventure.webp",
    rating: "4.93",
    duration: "7 Days / 6 Nights",
    season: "Winter",
    price: 4850,
    description: "Super-jeep glacier traverses, remote geothermal lagoons, glass igloo sleepouts.",
  },
  {
    name: "Australian Great Barrier Reef",
    location: "Australia",
    region: "oceania",
    style: "coastal",
    image: "/australian.png",
    rating: "4.90",
    duration: "10 Days / 9 Nights",
    season: "Autumn",
    price: 4100,
    description: "Lizard Island luxury retreat, private helicopter over heart reef, marine biologist guide.",
  },
];

const regions = [
  { id: "europe", name: "Europe", count: 42, image: "/europe.jpg" },
  { id: "asia", name: "Asia", count: 36, image: "/asia.jpg" },
  { id: "americas", name: "Americas", count: 28, image: "/america.jpg" },
  { id: "africa", name: "Africa", count: 22, image: "/africa.png" },
  { id: "oceania", name: "Oceania", count: 18, image: "/oceania.jpg" },
  { id: "middle-east", name: "Middle East", count: 14, image: "/middle-east.webp" },
];

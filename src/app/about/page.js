import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, Globe2, Compass, HeartHandshake, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="relative w-full h-[45vh] min-h-[360px] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        <Image
          src="/travel-team-bg.avif"
          alt="Wanderlust travel expedition team"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Since 2005
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Our Story & Craft
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Founded on the conviction that travel is not about collecting landmarks, but about cultivating rare, unhurried, and transformative intimacy with the world.
          </p>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight leading-tight">
              Two Decades of Curating the Inaccessible
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-stone-700 font-light leading-relaxed">
              <p>
                Wanderlust was born in 2005 out of dissatisfaction with commercial mass tourism. We watched travelers being hurried between overcrowded tour buses and standard hotel lobbies, completely insulated from the genuine cultural pulse of the territories they came to discover.
              </p>
              <p>
                We set out to construct a different paradigm: fully private expeditions anchored by intimate relationships with local scholars, master naturalists, historic estate families, and private conservancies.
              </p>
              <p>
                Today, our global bureau comprises over 60 destination architects across 12 countries. Every journey we build is an unrepeatable work of custom sequencing—designed specifically around your family’s passions and rhythm.
              </p>
            </div>

            {/* Stat Matrix with Tabular Figures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
              <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                <span className="font-serif text-3xl text-stone-950 font-normal tabular-nums">18+</span>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-1">Years of Craft</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                <span className="font-serif text-3xl text-stone-950 font-normal tabular-nums">120+</span>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-1">Sanctuaries</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                <span className="font-serif text-3xl text-stone-950 font-normal tabular-nums">48k+</span>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-1">Voyagers</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/80">
                <span className="font-serif text-3xl text-stone-950 font-normal tabular-nums">99.4%</span>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-1">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <Image
              src="/travel-team-action.webp"
              alt="Wanderlust master travel planners at work"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                On-Ground Vetting
              </p>
              <p className="font-serif text-lg text-white font-normal">
                Every property and private guide is personally inspected annually by our senior partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Principles */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Our Ethical Charter
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              How we protect the fragile wilderness and living cultures entrusted to our care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Absolute Discretion",
                desc: "We guard our travelers’ privacy with uncompromising rigor. Itineraries, passenger manifests, and private bookings are handled under strict confidentiality.",
              },
              {
                icon: Globe2,
                title: "100% Carbon Neutral",
                desc: "We calculate the exact carbon emissions of every flight, transfer, and lodge stay, offsetting each through certified Gold Standard reforestation programs.",
              },
              {
                icon: HeartHandshake,
                title: "Community Equity",
                desc: "We ensure economic prosperity remains within host communities. Over 85% of our operational spend is invested directly in local independent partners.",
              },
              {
                icon: Compass,
                title: "Purity of Pace",
                desc: "We reject the exhaustion of checklist travel. Our journeys are paced to allow contemplative afternoons, spontaneous conversations, and genuine restorative quiet.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-8 bg-stone-900 rounded-2xl border border-stone-800 space-y-4 hover:border-stone-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-white font-normal">{p.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Regional Directors */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
            The Architects
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight">
            Meet Our Senior Directors
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Seasoned explorers and regional scholars dedicated to engineering your perfect expedition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-72 w-full overflow-hidden bg-stone-100">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-normal text-stone-900">{member.name}</h3>
                <p className="text-xs uppercase tracking-wider text-amber-800 font-medium">
                  {member.role}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal">
              Collaborate With an Itinerary Director
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We look forward to hearing about your milestone voyage, sabbatical, or private family retreat.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-full transition-colors shrink-0 shadow-sm"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

const team = [
  {
    name: "Emily Chen",
    role: "Founder & Creative Director",
    photo: "/user1.jpg",
    bio: "Former luxury travel writer and historian with over 20 years pioneering private travel across East Asia and the Mediterranean.",
  },
  {
    name: "David Rodriguez",
    role: "Head of Global Operations",
    photo: "/user4.avif",
    bio: "Oversees round-the-clock logistics, private aviation clearances, and emergency contingency protocols across all four hemispheres.",
  },
  {
    name: "Sarah Johnson",
    role: "Director of Asian Expeditions",
    photo: "/user3.jpg",
    bio: "Resident of Kyoto and Bangkok for 12 years; curates after-hours temple access, private ryokan partnerships, and tea master residencies.",
  },
  {
    name: "Michael Okonkwo",
    role: "Director of African Wildlife",
    photo: "/user2.jpg",
    bio: "Born in Kenya; fellow of the Royal Geographical Society with direct leadership over private concessions and anti-poaching trust partnerships.",
  },
];

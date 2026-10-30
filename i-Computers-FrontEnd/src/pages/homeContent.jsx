import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── SLIDE DATA ──────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    tag: "NEW ARRIVAL",
    title: "Apple iMac M3",
    subtitle: "Power Meets Elegance",
    desc: "Experience desktop computing redefined. Blazing-fast M3 chip with stunning Retina display.",
    cta: "Shop Now",
    image: "/image1.jpg",
  },
  {
    id: 2,
    tag: "BUILD YOUR DREAM",
    title: "Custom PC Builds",
    subtitle: "Engineered for You",
    desc: "Tell us your vision — we build the machine. From gaming rigs to workstations, precision-crafted.",
    cta: "Start Building",
    image: "/image2.jpg",
  },
  {
    id: 3,
    tag: "REPAIR & SERVICE",
    title: "Expert Tech Care",
    subtitle: "Back in Action, Fast",
    desc: "Motherboard repairs, cooling upgrades, data recovery. Problems others can't fix — we do.",
    cta: "Book Service",
    image: "/image3.jpg",
  },
];

// ── REVIEWS ──────────────────────────────────────────────────────────────────
const reviews = [
  {
    name: "Praneeth Randunu",
    initials: "P",
    text: "I recently purchased an iMac M3 worth 790,000 LKR and it was hands down the best experience I've ever had! The staff was knowledgeable, friendly, and ensured I had all the details.",
    stars: 5,
  },
  {
    name: "Ariyadasa Kalindu",
    initials: "A",
    text: "From the moment I walked in, I was impressed by the exceptional service. They helped me find the perfect CPU cooling solution — my temperatures dropped significantly.",
    stars: 5,
  },
  {
    name: "Tharusha",
    initials: "T",
    text: "Really good customer service. Motherboard repair done within an hour. Other shops said it couldn't be fixed — they fixed it quickly. 100% recommend i-Computers!",
    stars: 5,
  },
  {
    name: "Ashan Fernando",
    initials: "A",
    text: "I'm a music composer and chose i-Computers to build my new PC. They built me a stunning machine with the latest features, far exceeding my expectations.",
    stars: 5,
  },
  {
    name: "Thisal Prabod",
    initials: "T",
    text: "I visited to build my 1st PC. They gave me an in-depth explanation about all the components and guided me to select perfect fits. Outstanding service.",
    stars: 5,
  },
  {
    name: "Thusitha Madushan",
    initials: "T",
    text: "I was blown away by the amazing atmosphere. It's by far the best computer store I've ever been to! Friendly, knowledgeable, and always willing to help.",
    stars: 5,
  },
];

// ── SERVICES ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🖥️",
    title: "Custom PC Builds",
    desc: "Tell us your requirements and budget. We hand-pick every component and assemble your dream machine.",
  },
  {
    icon: "🔧",
    title: "Repair & Maintenance",
    desc: "Expert repairs for laptops, desktops, and mobiles — from motherboard fixes to cooling upgrades.",
  },
  {
    icon: "📦",
    title: "Pre-Owned Devices",
    desc: "Certified pre-owned laptops and PCs, tested and ready to perform — at a fraction of the price.",
  },
  {
    icon: "💡",
    title: "Tech Consultation",
    desc: "Not sure what to buy? Our specialists guide you to the perfect tech solution for your needs.",
  },
];

// ── STARS ────────────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function HomeContent() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
    startInterval();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.dataset.id]: true }));
        }),
      { threshold: 0.12 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const refFor = (id) => (el) => {
    sectionRefs.current[id] = el;
    if (el) el.dataset.id = id;
  };

  const slide = slides[current];

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">

      {/* ─────────────────────── HERO SLIDER ─────────────────────────── */}
      <section
        className="relative w-full overflow-hidden cursor-pointer select-none"
        style={{ minHeight: "92vh" }}
        onClick={() => navigate("/products")}
      >
        {/* All 3 slide backgrounds stacked — cross-fade via opacity */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
            style={{
              backgroundImage: `url('${s.image}')`,
              opacity: i === current ? 1 : 0,
            }}
          />
        ))}

        {/* Neutral dark overlay — no colour tint */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Slide content */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 md:px-20 lg:px-32"
          style={{ minHeight: "92vh" }}
        >
          {/* Tag */}
          <div
            className="inline-flex mb-4 transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
            }}
          >
            <span className="text-xs font-bold tracking-[0.25em] px-3 py-1 rounded-full border border-white/40 text-white/70">
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-3 transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(18px)" : "translateY(0)",
              transitionDelay: "50ms",
              letterSpacing: "-0.02em",
              fontFamily: "'Georgia', serif",
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-light text-white/70 mb-4 transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(14px)" : "translateY(0)",
              transitionDelay: "90ms",
            }}
          >
            {slide.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-white/55 text-base md:text-lg max-w-xl mb-8 leading-relaxed transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(12px)" : "translateY(0)",
              transitionDelay: "130ms",
            }}
          >
            {slide.desc}
          </p>

          {/* CTA button */}
          <div
            className="transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transitionDelay: "170ms" }}
            onClick={(e) => { e.stopPropagation(); navigate("/products"); }}
          >
            <button className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl">
              {slide.cta} →
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-10 left-6 md:left-20 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#ffffff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xl flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xl flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          ›
        </button>

        {/* Slide counter */}
        <div className="absolute bottom-10 right-6 md:right-20 z-20 text-white/35 text-xs font-mono tracking-widest">
          0{current + 1} / 0{slides.length}
        </div>

        {/* Scrolling slogan ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-sm z-20 flex items-center overflow-hidden">
          <div
            className="flex gap-20 whitespace-nowrap text-white/45 text-xs font-mono tracking-[0.22em] uppercase"
            style={{ animation: "ticker 22s linear infinite" }}
          >
            {[
              "Your Vision, Our Build","Unmatched Service","Premium Tech, Local Expertise",
              "Repairs Done Right","Sri Lanka's Trusted Tech Hub",
              "Your Vision, Our Build","Unmatched Service","Premium Tech, Local Expertise",
            ].map((t, i) => <span key={i}>◆ {t}</span>)}
          </div>
        </div>

        <style>{`
          @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .reveal { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease; }
          .reveal.show { opacity:1; transform:translateY(0); }
          .reveal-delay-1{transition-delay:.1s}
          .reveal-delay-2{transition-delay:.2s}
          .reveal-delay-3{transition-delay:.3s}
          .reveal-delay-4{transition-delay:.4s}
        `}</style>
      </section>

      {/* ─────────────────────── MARQUEE ─────────────────────────────── */}
      <div className="bg-black py-4 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "ticker 18s linear infinite" }}>
          {[
            "iMac M3","Custom Gaming PCs","MacBook Pro","Laptop Repair",
            "RTX 4090 Builds","Pre-Owned Devices","Cooling Solutions",
            "iMac M3","Custom Gaming PCs","MacBook Pro","Laptop Repair","RTX 4090 Builds",
          ].map((item, i) => (
            <span key={i} className="text-white/55 text-sm font-medium tracking-widest uppercase">
              ✦ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────── ABOUT ───────────────────────────────── */}
      <section
        ref={refFor("about")}
        className={`reveal ${visible["about"] ? "show" : ""} py-20 md:py-28 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto`}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1">
            <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-3">About i-Computers</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-6"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
            >
              Sri Lanka's Premier
              <br />
              <span className="text-gray-300">Tech Destination</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              From custom PC builds to expert repairs, i-Computers has been delivering exceptional technology solutions across Sri Lanka. Walk in with a problem — walk out with a solution.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { num: "1500+", label: "Happy Customers" },
              { num: "5★",    label: "Google Rating" },
              { num: "10+",   label: "Years Experience" },
              { num: "24h",   label: "Fast Turnaround" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} ${visible["about"] ? "show" : ""} bg-gray-50 rounded-2xl p-6 border border-gray-100`}
              >
                <p className="text-3xl font-black text-black mb-1">{stat.num}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── SERVICES ────────────────────────────── */}
      <section className="bg-gray-50 py-20 md:py-28 px-6 md:px-20 lg:px-32">
        <div ref={refFor("services")} className={`reveal ${visible["services"] ? "show" : ""} max-w-7xl mx-auto`}>
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 text-center">What We Offer</p>
          <h2
            className="text-3xl md:text-5xl font-black text-center text-black mb-14"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Services & Solutions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} ${visible["services"] ? "show" : ""} bg-white rounded-2xl p-7 border border-gray-100 hover:border-black hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-black text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── CTA BANNER ──────────────────────────── */}
      <section
        ref={refFor("cta")}
        className={`reveal ${visible["cta"] ? "show" : ""} relative overflow-hidden bg-black py-20 px-6 md:px-20 lg:px-32 text-center`}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%,#3b82f6 0%,transparent 50%),radial-gradient(circle at 80% 50%,#ef4444 0%,transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3">Build Your Dream Machine</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Ready to Upgrade?
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Visit our showroom or browse our full catalog. Expert advice, premium products, and unbeatable service — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors"
            >
              Browse Products →
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 border border-white/30 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────── REVIEWS ─────────────────────────────── */}
      {/* <section
        ref={refFor("reviews")}
        className={`reveal ${visible["reviews"] ? "show" : ""} py-20 md:py-28 px-6 md:px-20 lg:px-32 bg-white`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex justify-center items-center gap-1 mb-3">
              {[["G","#4285F4"],["o","#EA4335"],["o","#FBBC05"],["g","#4285F4"],["l","#34A853"],["e","#EA4335"]].map(
                ([l, c], i) => <span key={i} className="text-2xl font-black" style={{ color: c }}>{l}</span>
              )}
            </div>
            <Stars count={5} />
            <p className="text-sm text-gray-500 mt-2">Based on 1,500+ verified reviews</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} ${visible["reviews"] ? "show" : ""} bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Stars count={r.stars} />
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                    {r.initials}
                  </div>
                  <span className="text-sm font-semibold text-black">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─────────────────────── PLACEHOLDER ─────────────────────────── */}
      {/* <section
        ref={refFor("placeholder")}
        className={`reveal ${visible["placeholder"] ? "show" : ""} py-20 md:py-28 px-6 md:px-20 lg:px-32 bg-gray-50`}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 text-center">Coming Soon</p>
          <h2
            className="text-3xl md:text-5xl font-black text-center text-black mb-14"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            More to Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Featured Deals","Tech Blog","Brand Partners"].map((label, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} ${visible["placeholder"] ? "show" : ""} border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-gray-400 transition-colors cursor-default`}
              >
                <div className="text-4xl mb-4 opacity-30">＋</div>
                <p className="text-gray-400 font-semibold">{label}</p>
                <p className="text-gray-300 text-xs mt-1">Section coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     
      

    </div>
  );
}
export default function AboutPage() {
  return (
    <div className="w-full bg-white font-sans">

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <div className="bg-black py-16 px-6 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3">Who We Are</p>
        <h1
          className="text-4xl md:text-6xl font-black text-white"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
        >
          About i-Computers
        </h1>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-600 text-lg leading-relaxed">
          i-Computers is Sri Lanka's trusted technology destination, based in the heart of Colombo.
          We combine expert knowledge with genuine care to deliver the best tech experience — whether
          you're buying, building, or repairing.
        </p>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase text-center mb-3">What We Do</p>
          <h2
            className="text-3xl md:text-4xl font-black text-black text-center mb-12"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: "🖥️",
                title: "Custom PC Builds",
                desc: "We design and assemble custom PCs tailored to your budget and needs — from high-end gaming rigs to professional workstations.",
              },
              {
                icon: "🔧",
                title: "Repairs & Maintenance",
                desc: "Fast, reliable repairs for laptops, desktops, and mobiles. Motherboard fixes, cooling upgrades, data recovery, and more.",
              },
              {
                icon: "🛒",
                title: "Product Sales",
                desc: "Wide range of computers, laptops, mobiles, accessories, and components from leading brands at competitive prices.",
              },
              {
                icon: "📦",
                title: "Pre-Owned Devices",
                desc: "Quality-tested second-hand laptops and PCs at affordable prices — great performance without the premium cost.",
              },
              {
                icon: "❄️",
                title: "Cooling & Upgrades",
                desc: "RAM upgrades, SSD installations, and advanced cooling solutions to breathe new life into your existing machine.",
              },
              {
                icon: "💡",
                title: "Tech Consultation",
                desc: "Not sure what to buy? Our specialists provide honest, personalised advice to match your requirements and budget.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors"
              >
                <span className="text-3xl flex-shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY US ────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase text-center mb-3">Why Choose Us</p>
        <h2
          className="text-3xl md:text-4xl font-black text-black text-center mb-12"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          The i-Computers Difference
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
          {[
            { num: "1500+", label: "Happy Customers" },
            { num: "5★",    label: "Google Rating" },
            { num: "10+",   label: "Years Experience" },
            { num: "24h",   label: "Fast Turnaround" },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-3xl font-black text-black mb-1">{stat.num}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <div className="bg-black py-14 px-6 text-center">
        <h3
          className="text-2xl md:text-3xl font-black text-white mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ready to get started?
        </h3>
        <p className="text-white/50 text-sm mb-7">Visit our store or get in touch — we're always happy to help.</p>
        <a
          href="/contact"
          className="inline-block px-8 py-3.5 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors"
        >
          Contact Us →
        </a>
      </div>

    </div>
  );
}
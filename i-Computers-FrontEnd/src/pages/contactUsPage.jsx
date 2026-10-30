export default function ContactUsPage() {
  return (
    <div className="w-full bg-white font-sans">

      {/* ── HEADER BANNER ─────────────────────────────────────────────── */}
      <div className="bg-black py-16 px-6 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3">Get In Touch</p>
        <h1
          className="text-4xl md:text-6xl font-black text-white"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
        >
          Contact Us
        </h1>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ── LEFT: Contact Details ──────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-2xl md:text-3xl font-black text-black mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            We'd love to hear from you
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Have a question about a product, need a repair, or want to build your dream PC?
            Reach out — our team is ready to help.
          </p>

          {/* Email */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Email</p>
              <a
                href="mailto:icomputers@gmail.com"
                className="text-black font-semibold text-sm hover:underline"
              >
                icomputers@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Phone</p>
              <a
                href="tel:+94764318050"
                className="text-black font-semibold text-sm hover:underline"
              >
                076 431 8050
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Address</p>
              <p className="text-black font-semibold text-sm leading-relaxed">
                42 Galle Road, Colombo 03<br />
                <span className="text-gray-500 font-normal">Western Province, Sri Lanka</span>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Opening Hours</p>
              <p className="text-black font-semibold text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-gray-500 text-sm">Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Message Form ────────────────────────────────────── */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <h3
            className="text-xl font-black text-black mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Send a Message
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Perera"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
                Subject
              </label>
              <input
                type="text"
                placeholder="PC Build Inquiry"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>

            <button className="w-full py-3.5 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200">
              Send Message →
            </button>
          </div>
        </div>
      </div>

      {/* ── MAP PLACEHOLDER ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <div className="w-full h-64 rounded-3xl overflow-hidden border border-gray-100">
          <iframe
            title="i-Computers Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d79.8560!3d6.9104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b0ba7b9%3A0x2f748d27d4fd9c60!2sGalle%20Rd%2C%20Colombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1"
            width="100%"
            height="100%"
            style={{ border: 0}}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
}
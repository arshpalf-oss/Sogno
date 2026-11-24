import { useEffect, useState, type ReactNode } from "react";

const WA = "https://wa.me/919999999999?text=Hi%20Dolce!%20I%27d%20like%20to%20order%20tiramisu";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const R = ({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) => (
  <div className={`reveal ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">{children}</p>
);

const Btn = ({ href, children, ghost }: { href: string; children: ReactNode; ghost?: boolean }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 active:scale-95 ${
      ghost
        ? "glass text-stone-900 hover:bg-white"
        : "bg-gradient-to-br from-stone-900 to-amber-950 text-amber-50 shadow-lg shadow-amber-900/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-900/35"
    }`}
  >
    {children}
    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
  </a>
);

function Nav() {
  const [s, setS] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = ["Menu", "Why Us", "Reviews", "Pricing", "FAQ"];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${s ? "py-2" : "py-4"}`}>
      <nav aria-label="Main" className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${s ? "glass mx-3 shadow-lg shadow-stone-900/5 md:mx-auto" : ""}`}>
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight">
          Dolce<span className="text-amber-700">.</span>
        </a>
        <ul className="hidden gap-8 text-sm text-stone-600 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a className="relative transition hover:text-stone-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full" href={`#${l.toLowerCase().replace(" ", "")}`}>{l}</a>
            </li>
          ))}
        </ul>
        <a href={WA} target="_blank" rel="noreferrer" className="hidden rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-amber-50 transition hover:bg-amber-900 md:block">Order now</a>
        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 md:hidden">
          <div className={`h-0.5 w-6 bg-stone-900 transition ${open ? "translate-y-1 rotate-45" : ""}`} />
          <div className={`mt-1.5 h-0.5 w-6 bg-stone-900 transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="glass mx-3 mt-2 rounded-3xl p-6 md:hidden">
          {links.map((l) => (
            <a key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase().replace(" ", "")}`} className="block py-2 text-lg">{l}</a>
          ))}
          <a href={WA} className="mt-3 block rounded-full bg-stone-900 py-3 text-center font-semibold text-amber-50">Order on WhatsApp</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div aria-hidden className="animate-blob absolute -top-20 -left-20 h-96 w-96 rounded-full bg-amber-200/60 blur-3xl" />
      <div aria-hidden className="animate-blob absolute top-40 right-0 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" style={{ animationDelay: "-6s" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <div>
          <R><span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />Now delivering across Moradabad</span></R>
          <R d={100}><h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">Italy's finest dessert, <em className="bg-gradient-to-r from-amber-700 to-amber-950 bg-clip-text text-transparent">made fresh</em> in Moradabad.</h1></R>
          <R d={200}><p className="mt-6 max-w-md text-lg text-stone-600">Velvety mascarpone, espresso-soaked savoiardi and a whisper of Dutch cocoa — handcrafted every morning, delivered chilled to your door in under 60 minutes.</p></R>
          <R d={300}><div className="mt-8 flex flex-wrap gap-3"><Btn href={WA}>Order on WhatsApp</Btn><Btn href="#menu" ghost>Explore menu</Btn></div></R>
          <R d={400}>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">{["🧑🏽", "👩🏻", "👨🏾", "👩🏽"].map((e, i) => <span key={i} className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-amber-100">{e}</span>)}</div>
              <p className="text-sm text-stone-600"><b className="text-stone-900">★ 4.9</b> from 2,400+ happy dessert lovers</p>
            </div>
          </R>
        </div>
        <R d={200} className="relative">
          <div className="animate-float relative">
            <img src="/images/hero.jpg" alt="A slice of layered tiramisu dusted with cocoa" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl shadow-amber-950/30" />
            <div className="glass absolute -bottom-6 -left-4 rounded-2xl p-4 shadow-xl md:-left-10">
              <p className="text-xs text-stone-500">Made this morning</p>
              <p className="font-serif text-lg">6:00 AM · Fresh batch</p>
            </div>
            <div className="glass absolute -top-4 -right-2 rounded-2xl px-4 py-3 shadow-xl md:-right-6">
              <p className="font-serif text-2xl">100%</p><p className="text-xs text-stone-500">Real mascarpone</p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

function Proof() {
  const items = ["Featured in Amar Ujala", "#1 on Zomato Desserts", "Swiggy Top Rated", "1,000+ Birthday Cakes", "Loved by Civil Lines", "Eggless Options", "Delivered Chilled"];
  return (
    <section aria-label="Social proof" className="border-y border-stone-200/70 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
        {[["2,400+", "Happy customers"], ["18,000+", "Slices served"], ["4.9★", "Average rating"], ["<60 min", "City delivery"]].map(([n, l], i) => (
          <R key={l} d={i * 100}><p className="font-serif text-3xl md:text-4xl">{n}</p><p className="mt-1 text-sm text-stone-500">{l}</p></R>
        ))}
      </div>
      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 text-sm font-medium uppercase tracking-widest text-stone-400">
          {[...items, ...items].map((t, i) => <span key={i}>✦ {t}</span>)}
        </div>
      </div>
    </section>
  );
}

const Head = ({ e, t, s }: { e: string; t: string; s?: string }) => (
  <div className="mx-auto max-w-2xl text-center">
    <R><Eyebrow>{e}</Eyebrow></R>
    <R d={100}><h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">{t}</h2></R>
    {s && <R d={200}><p className="mt-4 text-stone-600">{s}</p></R>}
  </div>
);

function Features() {
  const f = [
    ["☕", "Single-origin espresso", "Freshly pulled Arabica from Chikmagalur soaks every ladyfinger to perfection."],
    ["🧀", "Real Italian mascarpone", "No cream-cheese shortcuts. Just rich, silky, authentic mascarpone."],
    ["🌅", "Baked at sunrise", "Small batches every morning. If it's not fresh today, it's not served."],
    ["❄️", "Cold-chain delivery", "Insulated packaging keeps every layer perfect until your first spoonful."],
    ["🌱", "Eggless available", "Pure-veg recipe with the same luscious texture. Everyone's invited."],
    ["🎁", "Gift-ready boxes", "Elegant packaging with handwritten notes for every celebration."],
  ];
  return (
    <section id="whyus" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Head e="The Dolce difference" t="Obsessively crafted. Unmistakably fresh." s="Six promises behind every spoonful — the reason Moradabad keeps coming back." />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {f.map(([i, t, d], k) => (
            <R key={t} d={k * 80}>
              <div className="group h-full rounded-3xl border border-stone-200/70 bg-white/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-200 hover:bg-white hover:shadow-2xl hover:shadow-amber-900/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{i}</span>
                <h3 className="mt-6 font-serif text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{d}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const p = [
    { img: "/images/hero.jpg", n: "Classic Slice", d: "The original. Espresso, mascarpone, cocoa.", pr: 149, tag: "Bestseller" },
    { img: "/images/jar.jpg", n: "Tiramisu Jar", d: "Layered in glass. Perfect for on-the-go.", pr: 199, tag: "New" },
    { img: "/images/whole.jpg", n: "Celebration Cake", d: "1 kg showstopper for birthdays & parties.", pr: 1299, tag: "Party favourite" },
  ];
  return (
    <section id="menu" className="bg-gradient-to-b from-stone-950 to-amber-950 py-24 text-amber-50 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center"><R><p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">The menu</p></R>
          <R d={100}><h2 className="mt-4 font-serif text-4xl md:text-5xl">Pick your pleasure.</h2></R></div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {p.map((x, i) => (
            <R key={x.n} d={i * 120}>
              <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-white/10">
                <div className="relative overflow-hidden">
                  <img src={x.img} alt={x.n} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">{x.tag}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between"><h3 className="font-serif text-2xl">{x.n}</h3><p className="text-lg font-semibold text-amber-300">₹{x.pr}</p></div>
                  <p className="mt-2 text-sm text-amber-100/70">{x.d}</p>
                  <a href={WA} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full justify-center rounded-full bg-amber-50 py-3 text-sm font-semibold text-stone-900 transition hover:bg-amber-200 active:scale-95">Add to order</a>
                </div>
              </article>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <R><img src="/images/jar.jpg" alt="Tiramisu jars" loading="lazy" className="aspect-square w-full rounded-[2.5rem] object-cover shadow-2xl shadow-amber-900/20" /></R>
        <div>
          <R><Eyebrow>Why it matters</Eyebrow></R>
          <R d={100}><h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">Every moment deserves something extraordinary.</h2></R>
          <ul className="mt-10 space-y-6">
            {[["Celebrate effortlessly", "Birthdays, anniversaries, Diwali gifting — sorted in one WhatsApp message."], ["Treat yourself, guilt-light", "Balanced sweetness, never cloying. Indulgence that feels refined."], ["Impress every guest", "A café-grade dessert that turns any dinner into an occasion."], ["Support local craft", "Proudly made in Moradabad — the City of Brass, now the City of Tiramisu."]].map(([t, d], i) => (
              <R key={t} d={150 + i * 80}>
                <li className="flex gap-4"><span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-700 text-xs text-white">✓</span><div><h3 className="font-semibold">{t}</h3><p className="text-sm text-stone-600">{d}</p></div></li>
              </R>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    ["Ananya S.", "Civil Lines", "Honestly better than the tiramisu I had in Delhi's fanciest café. My family finished the whole cake in 10 minutes!"],
    ["Rohit A.", "Ram Ganga Vihar", "Ordered for my wife's birthday. Delivered cold, beautifully packed, and tasted unreal. We're regulars now."],
    ["Fatima K.", "Pakbara", "The eggless version is a blessing. Creamy, light and that coffee hit is perfect. 10/10."],
    ["Vikas M.", "Kanth Road", "Gifted 30 jars to my office team for Diwali. Everyone asked where it was from. Dolce is the real deal."],
    ["Priya G.", "Budh Bazaar", "Finally, authentic tiramisu in Moradabad! The mascarpone is so rich. Absolutely addictive."],
    ["Arjun T.", "Delhi Road", "Fast delivery, premium packaging, and the taste? Chef's kiss. Can't wait for them to go national."],
  ];
  return (
    <section id="reviews" className="bg-gradient-to-b from-amber-50/60 to-transparent py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Head e="Loved locally" t="Moradabad can't stop talking." />
        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {t.map(([n, l, q], i) => (
            <R key={n} d={(i % 3) * 100} className="mb-5 break-inside-avoid">
              <figure className="glass rounded-3xl p-7 shadow-sm transition hover:shadow-xl hover:shadow-amber-900/10">
                <p className="text-amber-600" aria-label="5 stars">★★★★★</p>
                <blockquote className="mt-3 leading-relaxed text-stone-700">"{q}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-600 to-amber-900 text-sm font-semibold text-white">{n[0]}</span><div><p className="text-sm font-semibold">{n}</p><p className="text-xs text-stone-500">{l}</p></div></figcaption>
              </figure>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const p = [
    { n: "Solo Treat", pr: "149", u: "/slice", f: ["1 classic slice", "Eggless option", "Free delivery above ₹299"], hi: false },
    { n: "Family Box", pr: "799", u: "/box", f: ["6 slices or 4 jars", "Mix & match flavours", "Free delivery", "Complimentary gift note"], hi: true },
    { n: "Celebration", pr: "1,299", u: "/kg", f: ["Whole 1 kg cake", "Custom message topping", "Priority delivery slot", "Candles & knife included"], hi: false },
  ];
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Head e="Simple pricing" t="Luxury, honestly priced." s="No hidden charges. Just extraordinary tiramisu." />
        <div className="mt-16 grid items-center gap-6 md:grid-cols-3">
          {p.map((x, i) => (
            <R key={x.n} d={i * 100}>
              <div className={`relative rounded-3xl p-8 transition duration-500 hover:-translate-y-1 ${x.hi ? "bg-gradient-to-br from-stone-900 to-amber-950 text-amber-50 shadow-2xl shadow-amber-900/30 md:scale-105 md:py-12" : "border border-stone-200 bg-white/70"}`}>
                {x.hi && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-stone-900">Most loved</span>}
                <h3 className="font-serif text-2xl">{x.n}</h3>
                <p className="mt-4"><span className="font-serif text-5xl">₹{x.pr}</span><span className={x.hi ? "text-amber-200/70" : "text-stone-500"}>{x.u}</span></p>
                <ul className="mt-6 space-y-3 text-sm">{x.f.map((f) => <li key={f} className="flex gap-2"><span className={x.hi ? "text-amber-400" : "text-amber-700"}>✓</span>{f}</li>)}</ul>
                <a href={WA} target="_blank" rel="noreferrer" className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition active:scale-95 ${x.hi ? "bg-amber-50 text-stone-900 hover:bg-amber-200" : "bg-stone-900 text-amber-50 hover:bg-amber-900"}`}>Order {x.n}</a>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const q = [
    ["Where do you deliver?", "Across all of Moradabad — Civil Lines, Ram Ganga Vihar, Delhi Road, Kanth Road and beyond. Pan-India shipping is coming soon!"],
    ["Is there an eggless version?", "Yes! Our eggless tiramisu is 100% vegetarian and every bit as creamy and indulgent."],
    ["Does it contain alcohol?", "No. We make a family-friendly recipe with zero alcohol, so everyone can enjoy it."],
    ["How long does it stay fresh?", "Best enjoyed within 48 hours, refrigerated. Honestly, it rarely lasts that long."],
    ["Can I order for a party or corporate event?", "Absolutely. We handle bulk orders of 20 to 500+ pieces with custom branding. Message us 48 hours ahead."],
    ["How do I pay?", "UPI, cards, or cash on delivery — whatever suits you."],
  ];
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <Head e="FAQ" t="Questions, answered." />
        <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
          {q.map(([a, b], i) => (
            <R key={a} d={i * 60}>
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} className="flex w-full items-center justify-between py-6 text-left font-medium transition hover:text-amber-800">
                {a}<span className={`ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-stone-300 transition-transform duration-300 ${o === i ? "rotate-45 bg-stone-900 text-white" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${o === i ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="overflow-hidden text-stone-600">{b}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-5 pb-24">
      <R>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-stone-950 via-amber-950 to-stone-900 px-6 py-20 text-center text-amber-50 md:py-28">
          <div aria-hidden className="animate-blob absolute -left-10 -top-10 h-72 w-72 rounded-full bg-amber-600/30 blur-3xl" />
          <div aria-hidden className="animate-blob absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" style={{ animationDelay: "-5s" }} />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-serif text-4xl tracking-tight md:text-6xl">Your first spoonful is one message away.</h2>
            <p className="mx-auto mt-5 max-w-md text-amber-100/70">Use code <b className="text-amber-300">DOLCE10</b> for 10% off your first order. Fresh batch, delivered today.</p>
            <a href={WA} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-50 px-8 py-4 font-semibold text-stone-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-white active:scale-95">Order on WhatsApp →</a>
          </div>
        </div>
      </R>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-semibold">Dolce<span className="text-amber-700">.</span></p>
          <p className="mt-3 max-w-sm text-sm text-stone-600">Handcrafted tiramisu from Moradabad, Uttar Pradesh — on a mission to become India's most loved tiramisu.</p>
        </div>
        <div className="text-sm"><p className="font-semibold">Visit</p><p className="mt-3 text-stone-600">Civil Lines, Moradabad<br />Uttar Pradesh 244001<br />Open daily · 10 AM – 10 PM</p></div>
        <div className="text-sm"><p className="font-semibold">Connect</p><ul className="mt-3 space-y-1 text-stone-600"><li><a className="hover:text-stone-900" href={WA}>WhatsApp</a></li><li><a className="hover:text-stone-900" href="#">Instagram</a></li><li><a className="hover:text-stone-900" href="mailto:hello@dolce.in">hello@dolce.in</a></li></ul></div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-5 text-xs text-stone-400">© {new Date().getFullYear()} Dolce Tiramisu. Made with love & espresso in Moradabad.</p>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:p-2">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero /><Proof /><Features /><Showcase /><Benefits /><Testimonials /><Pricing /><FAQ /><CTA />
      </main>
      <Footer />
    </>
  );
}

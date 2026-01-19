// app/page.tsx
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const nav = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const tiers = [
  {
    name: "Basic",
    price: "$5",
    desc: "For individuals and solo operators.",
    features: ["100 reminders / month", "Email reminders", "Templates", "History"],
    highlight: false,
  },
  {
    name: "Standard",
    price: "$10",
    desc: "Best for small businesses.",
    features: [
      "500 reminders / month",
      "Email + SMS ready",
      "Custom timing",
      "Message personalization",
      "Delivery logs",
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Pro",
    price: "$20",
    desc: "For teams and busy clinics.",
    features: [
      "Unlimited reminders",
      "Multiple staff calendars",
      "Priority delivery",
      "WhatsApp-ready",
      "Priority support",
    ],
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100">
      {/* tiny life: very subtle ambient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6">
        {/* NAVBAR */}
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5">
                <span className="text-sm font-semibold tracking-tight">AR</span>
              </div>
              {/* accent underline */}
              <div className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-cyan-300/70" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              Appointment Reminder
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="hover:text-white transition"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 py-2 text-sm text-slate-300 hover:text-white transition">
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-slate-200 transition">
                  Start trial
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* HERO */}
        <section className="py-24 max-w-3xl">
          <p className="text-sm text-slate-400">
            14-day free trial · No credit card required
          </p>

          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
            Appointment reminders
            <span className="text-cyan-200"> that clients respect</span>.
          </h1>

          <p className="mt-6 text-lg text-slate-400">
            Create appointments, choose when to remind, and send clear,
            professional messages that reduce no-shows.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black hover:bg-slate-200 transition">
                  Start 14-day trial
                </button>
              </SignUpButton>
            </SignedOut>

            <a
              href="#pricing"
              className="rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 transition"
            >
              View pricing
            </a>
          </div>

          {/* tiny life strip */}
          <div className="mt-10 flex flex-wrap gap-2 text-xs text-slate-300">
            {["Timezone-safe", "Delivery logs", "LATAM-ready tone"].map((x) => (
              <span
                key={x}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                {x}
              </span>
            ))}
          </div>
        </section>

        {/* PRODUCT */}
        <section id="product" className="py-20 border-t border-white/10">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                title: "Clear reminders",
                desc: "Time, date, and location — clean and consistent.",
              },
              {
                title: "Flexible timing",
                desc: "24h, 2h, 15m, or custom schedules.",
              },
              {
                title: "Reliable delivery",
                desc: "Delivery status and logs for every reminder.",
              },
            ].map((f) => (
              <div key={f.title} className="group">
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <div className="mt-3 h-[2px] w-10 rounded-full bg-white/10 group-hover:bg-cyan-300/70 transition" />
                <p className="mt-3 text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 border-t border-white/10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold">Pricing</h2>
            <p className="mt-2 text-slate-400">
              All plans include a 14-day free trial.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={[
                  "rounded-lg border p-6 transition",
                  t.highlight
                    ? "border-cyan-300/40 bg-white/[0.04] shadow-[0_0_0_1px_rgba(34,211,238,0.20)]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{t.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{t.desc}</p>
                  </div>

                  {t.highlight && (
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {t.badge}
                    </span>
                  )}
                </div>

                <p className="mt-6 text-4xl font-semibold">
                  {t.price}
                  <span className="text-sm font-normal text-slate-400">/mo</span>
                </p>

                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-cyan-200">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button
                        className={[
                          "w-full rounded-md px-4 py-2 text-sm font-medium transition",
                          t.highlight
                            ? "bg-white text-black hover:bg-slate-200"
                            : "border border-white/10 hover:bg-white/5",
                        ].join(" ")}
                      >
                        Start trial
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <a
                      href="/dashboard"
                      className={[
                        "block w-full rounded-md px-4 py-2 text-center text-sm font-medium transition",
                        t.highlight
                          ? "bg-white text-black hover:bg-slate-200"
                          : "border border-white/10 hover:bg-white/5",
                      ].join(" ")}
                    >
                      Go to dashboard
                    </a>
                  </SignedIn>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 border-t border-white/10 max-w-3xl">
          <h2 className="text-2xl font-semibold">FAQ</h2>

          <div className="mt-8 space-y-6 text-sm text-slate-400">
            <p>
              <strong className="text-slate-200">Is there a free plan?</strong>
              <br />
              No — all plans start with a 14-day free trial.
            </p>

            <p>
              <strong className="text-slate-200">
                Do clients need accounts?
              </strong>
              <br />
              No. Only you use the app.
            </p>

            <p>
              <strong className="text-slate-200">
                Can I cancel anytime?
              </strong>
              <br />
              Yes. No contracts.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 border-t border-white/10 text-sm text-slate-400">
          © {new Date().getFullYear()} Appointment Reminder
        </footer>
      </main>
    </div>
  );
}

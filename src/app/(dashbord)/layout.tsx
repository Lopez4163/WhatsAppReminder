// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

/**
 * V1 SIMPLE DASHBOARD (styling matches your landing page)
 *
 * What this page shows:
 * - 3 KPI cards: Today's Appointments, Sent Today, Failed Today
 * - Red banner if failed > 0
 * - Today's appointments table with reminder status
 * - One primary action: Add appointment (links to /appointments/new)
 *
 * Hook this up later:
 * - Replace the mocked data with Prisma queries scoped by businessId.
 */

type ReminderStatus = "none" | "queued" | "sent" | "failed";

type Row = {
  id: string;
  timeLabel: string; // e.g. "9:00 AM"
  customer: string;
  title: string;
  appointmentStatus: string; // from AppointmentStatus enum
  reminder: ReminderStatus; // derived from latest Message for appointment
};

function badge(status: ReminderStatus) {
  if (status === "sent") {
    return (
      <span className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">
        ● Sent
      </span>
    );
  }
  if (status === "queued") {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
        ● Queued
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center rounded-full border border-rose-300/20 bg-rose-300/10 px-2.5 py-1 text-xs font-semibold text-rose-100">
        ● Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-200">
      ● None
    </span>
  );
}

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const user = await currentUser();

  // ---------------------------
  // TODO: Replace with Prisma
  // ---------------------------
  // Example Prisma intent:
  // - businessId from your User table (mapped by clerk user)
  // - "today" range computed using Business.timezone
  //
  // const kpis = { todaysAppointments, sentToday, failedToday }
  // const rows = todayAppointments with customer + latest message status
  //
  // For now, mocked:
  const kpis = {
    todaysAppointments: 5,
    sentToday: 4,
    failedToday: 1,
  };

  const rows: Row[] = [
    {
      id: "a1",
      timeLabel: "9:00 AM",
      customer: "John D.",
      title: "Haircut",
      appointmentStatus: "scheduled",
      reminder: "sent",
    },
    {
      id: "a2",
      timeLabel: "11:30 AM",
      customer: "Maria R.",
      title: "Consultation",
      appointmentStatus: "scheduled",
      reminder: "queued",
    },
    {
      id: "a3",
      timeLabel: "2:00 PM",
      customer: "Alex P.",
      title: "Follow-up",
      appointmentStatus: "scheduled",
      reminder: "failed",
    },
    {
      id: "a4",
      timeLabel: "4:15 PM",
      customer: "Sofia G.",
      title: "Check-in",
      appointmentStatus: "scheduled",
      reminder: "none",
    },
    {
      id: "a5",
      timeLabel: "6:00 PM",
      customer: "Daniel K.",
      title: "Initial visit",
      appointmentStatus: "scheduled",
      reminder: "sent",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100">
      {/* subtle ambient like your homepage */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6">
        {/* TOP NAV */}
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5">
                <span className="text-sm font-semibold tracking-tight">AR</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-cyan-300/70" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Dashboard
              </span>
              <span className="text-xs text-slate-400">
                {user?.emailAddresses?.[0]?.emailAddress ?? "Signed in"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 transition md:inline-flex"
            >
              Home
            </Link>

            <Link
              href="/appointments/new"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-slate-200 transition"
            >
              + Add appointment
            </Link>

            <div className="ml-1">
              <UserButton />
            </div>
          </div>
        </header>

        {/* PAGE TITLE */}
        <section className="pt-10 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Today overview
            <span className="text-cyan-200"> (V1)</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Keep it simple: add appointments, send reminders, spot failures fast.
          </p>
        </section>

        {/* KPI CARDS */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-slate-400">Today’s appointments</div>
            <div className="mt-2 text-3xl font-semibold">
              {kpis.todaysAppointments}
            </div>
            <div className="mt-3 h-[2px] w-10 rounded-full bg-white/10" />
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-slate-400">Reminders sent today</div>
            <div className="mt-2 text-3xl font-semibold">{kpis.sentToday}</div>
            <div className="mt-3 h-[2px] w-10 rounded-full bg-white/10" />
          </div>

          <div
            className={[
              "rounded-lg border bg-white/[0.03] p-5",
              kpis.failedToday > 0
                ? "border-rose-300/25 shadow-[0_0_0_1px_rgba(244,63,94,0.12)]"
                : "border-white/10",
            ].join(" ")}
          >
            <div className="text-xs text-slate-400">Failed today</div>
            <div className="mt-2 text-3xl font-semibold">
              {kpis.failedToday}
            </div>
            <div
              className={[
                "mt-3 h-[2px] w-10 rounded-full",
                kpis.failedToday > 0 ? "bg-rose-300/50" : "bg-white/10",
              ].join(" ")}
            />
          </div>
        </section>

        {/* FAIL BANNER */}
        {kpis.failedToday > 0 && (
          <section className="mt-6 rounded-lg border border-rose-300/20 bg-rose-300/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-rose-100">
                  Some reminders failed to send.
                </p>
                <p className="mt-1 text-xs text-slate-200/80">
                  Click “Resend” on the failed appointments below.
                </p>
              </div>

              <Link
                href="#today"
                className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 transition"
              >
                View failures
              </Link>
            </div>
          </section>
        )}

        {/* TODAY TABLE */}
        <section
          id="today"
          className="mt-8 rounded-lg border border-white/10 bg-white/[0.03]"
        >
          <div className="flex items-center justify-between gap-3 p-5">
            <div>
              <h2 className="text-sm font-semibold">Today’s appointments</h2>
              <p className="mt-1 text-xs text-slate-400">
                Reminder status is based on the latest message for each appointment.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/appointments/new"
                className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 transition"
              >
                + Add
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-t border-white/10">
              <thead className="text-left text-xs text-slate-400">
                <tr className="[&>th]:px-5 [&>th]:py-3">
                  <th>Time</th>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Reminder</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {rows.map((r) => {
                  const isFailed = r.reminder === "failed";
                  return (
                    <tr
                      key={r.id}
                      className={[
                        "border-t border-white/10",
                        isFailed ? "bg-rose-300/[0.06]" : "hover:bg-white/[0.02]",
                      ].join(" ")}
                    >
                      <td className="px-5 py-4 text-slate-200">{r.timeLabel}</td>
                      <td className="px-5 py-4 text-slate-200">{r.customer}</td>
                      <td className="px-5 py-4 text-slate-300">{r.title}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-200">
                          {r.appointmentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4">{badge(r.reminder)}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className={[
                              "rounded-md px-3 py-2 text-xs font-semibold transition",
                              isFailed
                                ? "bg-white text-black hover:bg-slate-200"
                                : "border border-white/10 text-slate-200 hover:bg-white/5",
                            ].join(" ")}
                            // TODO: wire to POST /api/messages/resend or similar
                            onClick={() => {
                              // V1: create a new Message row (queued) for this appointment
                              // then trigger send worker / cron
                              console.log("resend", r.id);
                            }}
                          >
                            Resend
                          </button>

                          <button
                            className="rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 transition"
                            // TODO: wire to edit page/modal
                            onClick={() => console.log("edit", r.id)}
                          >
                            Edit
                          </button>

                          <button
                            className="rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5 transition"
                            // TODO: set Appointment.status = cancelled
                            onClick={() => console.log("cancel", r.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* tiny footer status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5 text-xs text-slate-400">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Channel: Email (V1)
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Queue: {rows.filter((r) => r.reminder === "queued").length} queued
              </span>
            </div>

            <span>
              Last check: <span className="text-slate-200">just now</span>
            </span>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 text-sm text-slate-400">
          <div className="mt-10 border-t border-white/10 pt-6">
            © {new Date().getFullYear()} Appointment Reminder
          </div>
        </footer>
      </main>
    </div>
  );
}

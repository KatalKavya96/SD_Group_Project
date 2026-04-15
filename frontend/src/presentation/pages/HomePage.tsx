import React from "react";
import {
  Bell,
  Home,
  LayoutDashboard,
  MapPinned,
  Settings,
  LogOut,
  Plus,
  Search,
  Map,
  BatteryCharging,
  Thermometer,
  Gauge,
  ArrowRight,
  Zap,
  Clock3,
  Wallet,
  Route,
  Car,
  ChevronRight,
  LocateFixed,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const trendData = [
  { time: "12:00", charge: 18 },
  { time: "12:30", charge: 48 },
  { time: "01:00", charge: 61 },
  { time: "01:30", charge: 95 },
];

const commuteData = [
  { day: "02 Jan", km: 78 },
  { day: "03 Jan", km: 46 },
  { day: "04 Jan", km: 24 },
  { day: "05 Jan", km: 68 },
  { day: "06 Jan", km: 41 },
];

const vehicles = [
  { name: "Jupiter", model: "Sedan EV-X", battery: 73, range: 251, capacity: 129 },
  { name: "Polar", model: "Cybertruck XIV", battery: 95, range: 350, capacity: 149 },
  { name: "BMW", model: "Sedan X Series", battery: 69, range: 289, capacity: 149 },
];

const stations = [
  {
    name: "ThunderX Power Point",
    address: "1002 Steven Rd, Boston",
    status: "Busy",
    eta: "35 min",
    price: "$0.69 / kWh",
    tag: "15% Saver",
  },
  {
    name: "Lither Hexa Power",
    address: "David Block Circle, Boston",
    status: "Available",
    eta: "19 min",
    price: "$0.79 / kWh",
    tag: "25% Faster",
  },
  {
    name: "Electrus Nebula Station",
    address: "D-Block, Rolex Rd, Boston",
    status: "Busy",
    eta: "12 min",
    price: "$0.97 / kWh",
    tag: "70% Faster",
  },
];

type SideNavItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

type MetricPillProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

type VehicleItem = (typeof vehicles)[number];
type StationItem = (typeof stations)[number];

function ElectrifyLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#8BE28A" />
          <stop offset="100%" stopColor="#22C7FF" />
        </linearGradient>
        <linearGradient id="boltGrad" x1="20" y1="20" x2="80" y2="90">
          <stop offset="0%" stopColor="#7FE5A0" />
          <stop offset="100%" stopColor="#18C8FF" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="41" stroke="url(#ringGrad)" strokeWidth="6" />
      <path
        d="M55 16L25 55H46L39 83L73 42H56L55 16Z"
        fill="url(#boltGrad)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SideNavItem({ icon: Icon, label, active = false }: SideNavItemProps) {
  return (
    <button
      className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl border ${
          active
            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
            : "border-white/10 bg-white/5 text-slate-400 group-hover:text-white"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </button>
  );
}

function MetricPill({ icon: Icon, label, value }: MetricPillProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function VehicleMiniCard({ item, index }: { item: VehicleItem; index: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-4 flex h-24 items-center justify-center rounded-2xl border border-cyan-400/10 bg-[radial-gradient(circle_at_top,_rgba(34,199,255,0.22),_transparent_60%)]">
        <div
          className={`h-10 w-24 rounded-[999px] border border-white/10 bg-gradient-to-r ${
            index % 2 === 0
              ? "from-cyan-300 via-slate-100 to-cyan-500"
              : "from-slate-400 via-slate-200 to-slate-600"
          } shadow-[0_0_40px_rgba(34,199,255,0.18)]`}
        />
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-slate-400">{item.model}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400">
        <div>
          <p>Battery</p>
          <p className="mt-1 text-sm font-semibold text-white">{item.battery}%</p>
        </div>
        <div>
          <p>Range</p>
          <p className="mt-1 text-sm font-semibold text-white">{item.range} km</p>
        </div>
        <div>
          <p>Capacity</p>
          <p className="mt-1 text-sm font-semibold text-white">{item.capacity} kWh</p>
        </div>
      </div>
    </div>
  );
}

function StationCard({ station }: { station: StationItem }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-cyan-400/25 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex h-28 w-full items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(139,226,138,0.18),_transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] lg:w-36">
          <div className="relative h-20 w-10 rounded-xl border border-white/15 bg-slate-900 shadow-[0_0_30px_rgba(34,199,255,0.12)]">
            <div className="absolute left-1/2 top-2 h-2 w-6 -translate-x-1/2 rounded-full bg-emerald-300/80" />
            <div className="absolute inset-x-2 top-6 h-8 rounded-md bg-slate-800" />
            <div className="absolute -right-3 top-8 h-8 w-3 rounded-r-full border border-white/10 bg-slate-900" />
            <div className="absolute -right-5 top-11 h-8 w-6 rounded-br-[14px] border-b border-r border-white/15" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{station.name}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                <MapPinned className="h-4 w-4 text-cyan-300" />
                {station.address}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
              <Zap className="h-3.5 w-3.5" />
              {station.tag}
            </div>
          </div>

          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
              <p className="text-xs text-slate-500">Status</p>
              <p className="mt-1 font-medium text-white">{station.status}</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
              <p className="text-xs text-slate-500">Charge ETA</p>
              <p className="mt-1 font-medium text-white">{station.eta}</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
              <p className="text-xs text-slate-500">Price</p>
              <p className="mt-1 font-medium text-white">{station.price}</p>
            </div>

            <div className="flex items-center xl:justify-end">
              <button className="h-11 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-300 px-4 font-semibold text-slate-950 transition hover:opacity-90 xl:w-auto">
                <span className="flex items-center justify-center">
                  <Zap className="mr-2 h-4 w-4" />
                  Book now
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const initials =
    (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
    
  return (

    
    <div className="min-h-screen bg-[#050B16] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,199,255,0.18),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(139,226,138,0.14),_transparent_22%),linear-gradient(180deg,#071120_0%,#050B16_35%,#06101B_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:90px_90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(34,199,255,0.2),transparent_40%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4 lg:p-6">
          <aside className="hidden w-[280px] shrink-0 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:flex lg:flex-col">
            <div className="mb-8 flex items-center gap-3 px-2">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/20 bg-white/5 shadow-[0_0_30px_rgba(34,199,255,0.12)]">
                <ElectrifyLogo className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-wide text-white">Electrify</p>
                <p className="text-xs text-slate-400">Smart EV Command Center</p>
              </div>
            </div>

            <div className="space-y-2">
              <SideNavItem icon={Home} label="Home" active />
              <SideNavItem icon={LayoutDashboard} label="Dashboard" />
              <SideNavItem icon={MapPinned} label="Stations" />
              <button onClick={() => navigate("/profile")}>
                <SideNavItem icon={Settings} label="Settings" />
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login", { replace: true });
                }}
              >
                <SideNavItem icon={LogOut} label="Logout" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between px-2">
              <h3 className="text-lg font-semibold text-white">My Vehicles</h3>
              <button className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {vehicles.map((item, index) => (
                <VehicleMiniCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Welcome back,{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                      {firstName}
                    </span>
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Monitor your EV ecosystem, plan routes, and find the fastest nearby stations.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-[240px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    placeholder="Search stations, routes..."
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10">
                    <Bell className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400 to-emerald-300 font-semibold text-slate-950">
                      {initials.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{firstName} {lastName}</p>
                      {/* <p className="text-xs text-slate-400">User</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr_1fr]">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">Charge Trend</h2>
                      <p className="text-sm text-slate-400">Real-time battery growth during charging</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                      Today
                    </div>
                  </div>

                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="time"
                          tick={{ fill: "#94A3B8", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "#94A3B8", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(9, 15, 29, 0.9)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 16,
                            color: "white",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="charge"
                          stroke="#22C7FF"
                          strokeWidth={3}
                          dot={{ r: 5, fill: "#7FE5A0", stroke: "#0B1220", strokeWidth: 2 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                  <div className="p-6">
                    <div className="mb-5 flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-white">Plan a Trip</h2>
                        <p className="text-sm text-slate-400">AI-assisted route with smart charging stops</p>
                      </div>
                      <button className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                        <p className="mb-2 text-xs text-slate-500">From</p>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <Home className="h-4 w-4 text-cyan-300" />
                          Home
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                        <p className="mb-2 text-xs text-slate-500">To</p>
                        <div className="flex items-center gap-2 text-sm text-white">
                          <LocateFixed className="h-4 w-4 text-cyan-300" />
                          Boston City
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 h-12 w-full rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 transition hover:bg-cyan-400/15">
                      <span className="flex items-center justify-center">
                        <Map className="mr-2 h-4 w-4" />
                        Get Direction
                      </span>
                    </button>
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                  <div className="p-6">
                    <h3 className="mb-5 text-xl font-semibold text-white">Trip Summary</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <MetricPill icon={Route} label="Distance" value="121 km" />
                      <MetricPill icon={Clock3} label="Duration" value="1.7 hrs" />
                      <MetricPill icon={Wallet} label="Est. Cost" value="$4.75" />
                      <MetricPill icon={Zap} label="Charge Stops" value="5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                  <div className="relative p-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,199,255,0.22),_transparent_45%),linear-gradient(180deg,rgba(2,8,23,0.2),rgba(2,8,23,0.7))]" />
                    <div className="relative h-[295px] overflow-hidden p-6">
                      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent),radial-gradient(circle_at_50%_0%,rgba(34,199,255,0.2),transparent_35%)]" />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08101f] to-transparent" />

                      <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                            <Zap className="h-3.5 w-3.5" />
                            Vehicle Overview
                          </div>

                          <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300">
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="relative mx-auto mt-2 w-full max-w-sm">
                          <div className="absolute inset-x-10 bottom-3 h-10 rounded-full bg-cyan-400/20 blur-2xl" />
                          <div className="relative mx-auto h-28 w-full max-w-[320px] rounded-[999px] border border-white/10 bg-gradient-to-r from-slate-100 via-white to-slate-300 shadow-[0_25px_60px_rgba(34,199,255,0.18)]">
                            <div className="absolute left-8 right-8 top-7 h-7 rounded-full bg-slate-900/10" />
                            <div className="absolute -bottom-2 left-8 h-10 w-10 rounded-full border-[6px] border-slate-900 bg-slate-700" />
                            <div className="absolute -bottom-2 right-8 h-10 w-10 rounded-full border-[6px] border-slate-900 bg-slate-700" />
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <MetricPill icon={BatteryCharging} label="Battery" value="75%" />
                          <MetricPill icon={Thermometer} label="Temperature" value="23°C" />
                          <MetricPill icon={Gauge} label="Range" value="251 km" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-white">Avg Daily Commute</h2>
                        <p className="text-sm text-slate-400">January 2025</p>
                      </div>
                      <Car className="h-5 w-5 text-cyan-300" />
                    </div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={commuteData}>
                          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                          <XAxis
                            dataKey="day"
                            tick={{ fill: "#94A3B8", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fill: "#94A3B8", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(9, 15, 29, 0.9)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16,
                            }}
                          />
                          <Bar dataKey="km" radius={[14, 14, 0, 0]} fill="#4AA7FF" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Stations Nearby</h2>
                  <p className="text-sm text-slate-400">
                    Fast charging hubs curated around your active route
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                  See all
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {stations.map((station) => (
                  <StationCard key={station.name} station={station} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
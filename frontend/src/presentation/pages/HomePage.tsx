import { useNavigate } from "react-router-dom";
import logo from "../../assets/electrify-logo.png";
import authBg from "../../assets/auth-bg.png";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBg})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.7)_35%,rgba(2,6,23,0.9)_100%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <img
            src={logo}
            alt="Electrify"
            className="w-52 object-contain sm:w-64 lg:w-72"
          />

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl sm:block">
              {user?.firstName ? `Hi, ${user.firstName}` : "Welcome"}
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 pb-6 sm:px-8 lg:px-10">
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                Customer Dashboard
              </p>

              <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                Your Electrify dashboard is ready. As backend APIs come in, this
                page can show nearby stations, live slot availability, booking
                history, payments, and personalized charging insights.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                Profile Snapshot
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Name
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {user?.firstName || "User"} {user?.lastName || ""}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.phoneNumber || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Address
                  </p>
                  <p className="mt-1 text-base text-slate-200">
                    {user?.address || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
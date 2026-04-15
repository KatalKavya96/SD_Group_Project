import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Home,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import authBg from "../../assets/auth-bg.png";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../../application/services/AuthService";

const authService = new AuthService();

function ElectrifyLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ringGradProfile" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#8BE28A" />
          <stop offset="100%" stopColor="#22C7FF" />
        </linearGradient>
        <linearGradient id="boltGradProfile" x1="20" y1="20" x2="80" y2="90">
          <stop offset="0%" stopColor="#7FE5A0" />
          <stop offset="100%" stopColor="#18C8FF" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="41"
        stroke="url(#ringGradProfile)"
        strokeWidth="6"
      />
      <path
        d="M55 16L25 55H46L39 83L73 42H56L55 16Z"
        fill="url(#boltGradProfile)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SideNavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
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

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      </div>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function InputField({
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/10"
    />
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const displayFirstName = user?.firstName || "User";
  const displayLastName = user?.lastName || "";
  const initials = (
    (user?.firstName?.[0] || "U") + (user?.lastName?.[0] || "")
  ).toUpperCase();

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");
    setProfileError("");

    try {
      setProfileMessage("Profile update API is not connected yet. UI is ready.");
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : "Profile update failed"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage("");
    setPasswordError("");

    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordError("Please fill all password fields.");
        return;
      }

      if (newPassword.length < 6) {
        setPasswordError("New password must be at least 6 characters long.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setPasswordError("New password and confirm password do not match.");
        return;
      }

      if (currentPassword === newPassword) {
        setPasswordError("New password must be different from current password.");
        return;
      }

      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password changed successfully.");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Password change failed"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#050B16] text-white">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${authBg})` }}
        />
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
                <p className="text-xs text-slate-400">Account Settings</p>
              </div>
            </div>

            <div className="space-y-2">
              <SideNavItem
                icon={Home}
                label="Home"
                onClick={() => navigate("/home")}
              />
              <SideNavItem
                icon={LayoutDashboard}
                label="Dashboard"
                onClick={() => navigate("/home")}
              />
              <SideNavItem
                icon={Settings}
                label="Profile Settings"
                active
              />
              <SideNavItem
                icon={LogOut}
                label="Logout"
                onClick={handleLogout}
              />
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Account Status</p>
                <Bell className="h-4 w-4 text-cyan-300" />
              </div>
              <p className="text-xs leading-6 text-slate-400">
                Manage your identity, contact details, and password securely from
                one unified Electrify control panel.
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Logged in as
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400 to-emerald-300 font-semibold text-slate-950">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {displayFirstName} {displayLastName}
                  </p>
                  <p className="text-xs text-slate-400">{user?.email || "No email"}</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-3">
                  <Link
                    to="/home"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Profile &{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    Settings
                  </span>
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Update your account details and secure your Electrify access.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400 to-emerald-300 font-semibold text-slate-950">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {displayFirstName} {displayLastName}
                  </p>
                  <p className="text-xs text-slate-400">Electrify User</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
              <section className="space-y-6">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                        Profile Overview
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        Personal Info
                      </h2>
                    </div>
                    <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-6 flex flex-col items-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,199,255,0.18),_transparent_60%)] px-6 py-8 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400 to-emerald-300 text-2xl font-bold text-slate-950 shadow-[0_0_30px_rgba(34,199,255,0.2)]">
                      {initials}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {displayFirstName} {displayLastName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Electrify Account Member
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <InfoCard
                      icon={Mail}
                      label="Email"
                      value={user?.email || "Not available"}
                    />
                    <InfoCard
                      icon={Phone}
                      label="Phone"
                      value={user?.phoneNumber || "Not available"}
                    />
                    <InfoCard
                      icon={MapPin}
                      label="Address"
                      value={user?.address || "Not available"}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                        Edit Profile
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        Update Account Details
                      </h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <User className="h-5 w-5" />
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <InputField
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                      />
                      <InputField
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>

                    <InputField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <InputField
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                      />
                      <InputField
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                      />
                    </div>

                    {profileError ? (
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {profileError}
                      </div>
                    ) : null}

                    {profileMessage ? (
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                        {profileMessage}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-300 font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="flex items-center justify-center">
                        <Save className="mr-2 h-4 w-4" />
                        {profileLoading ? "Saving..." : "Save Profile"}
                      </span>
                    </button>
                  </form>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                        Security
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        Change Password
                      </h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <InputField
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                    />

                    <InputField
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                    />

                    <InputField
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                    />

                    {passwordError ? (
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {passwordError}
                      </div>
                    ) : null}

                    {passwordMessage ? (
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                        {passwordMessage}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="h-12 w-full rounded-2xl border border-cyan-400/20 bg-cyan-400/10 font-semibold text-cyan-200 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="flex items-center justify-center">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        {passwordLoading ? "Updating..." : "Change Password"}
                      </span>
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
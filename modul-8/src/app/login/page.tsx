import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-150 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative w-full max-w-105">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/90">
            Portal Akademik
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Selamat Datang Kembali
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Masuk untuk mengakses ruang kerja dan profil mahasiswa
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <form action={loginAction} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-2"
              >
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@universitas.ac.id"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-2"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/10 hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
            >
              Masuk ke Portal
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-5 text-center">
            <p className="text-sm text-zinc-400">
              Belum memiliki akun?{" "}
              <Link
                href="/register"
                className="font-medium text-amber-300 hover:text-amber-200 underline-offset-4 hover:underline transition"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
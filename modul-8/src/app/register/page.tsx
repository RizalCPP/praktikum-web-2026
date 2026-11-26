import { Suspense } from "react";
import Link from "next/link";
import { registerAction } from "@/actions/auth";

async function RegisterAlert({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (params.error !== "email-exists") return null;

  return (
    <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
      Email tersebut sudah terdaftar. Silakan gunakan email lain atau langsung{" "}
      <Link href="/login" className="font-semibold underline hover:text-rose-200">
        masuk di sini
      </Link>
      .
    </div>
  );
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-150 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative w-full max-w-110">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/90">
            Registrasi Mahasiswa
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Buat Akun Baru
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Lengkapi identitas akademik untuk memulai
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <Suspense fallback={null}>
            <RegisterAlert searchParams={searchParams} />
          </Suspense>

          <form action={registerAction} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-1.5"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition"
              />
            </div>

            <div>
              <label
                htmlFor="nim"
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-1.5"
              >
                Nomor Induk Mahasiswa{" "}
                <span className="text-zinc-500 font-normal">(Opsional)</span>
              </label>
              <input
                id="nim"
                name="nim"
                type="text"
                placeholder="Contoh: 2306001"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-1.5"
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
                className="block text-xs font-medium tracking-wide text-zinc-400 mb-1.5"
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
              className="mt-3 w-full rounded-xl bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/10 hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
            >
              Selesaikan Pendaftaran
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-5 text-center">
            <p className="text-sm text-zinc-400">
              Sudah terdaftar?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-300 hover:text-amber-200 underline-offset-4 hover:underline transition"
              >
                Masuk ke akun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
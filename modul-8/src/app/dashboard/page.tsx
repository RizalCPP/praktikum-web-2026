import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

interface SessionPayload {
  id: number;
  name: string;
  nim: string | null;
  email: string;
  role: string;
}

async function DashboardContent() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("praktikum_session");

  if (!sessionCookie?.value) {
    redirect("/login");
  }

  let user: SessionPayload;
  try {
    user = JSON.parse(sessionCookie.value);
  } catch {
    redirect("/login");
  }

  const initial = user.name?.charAt(0).toUpperCase() || "U";
  const roleLabel = user.role === "ADMIN" ? "Administrator" : "Mahasiswa";

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href="/dashboard"
            className="text-sm font-semibold uppercase tracking-[0.22em] text-white"
          >
            Praktikum Pemrograman Web - Rizal Septiazi 2406034<span className="text-amber-400">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/produk"
              className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition"
            >
              Produk
            </Link>

            <Link
              href="/dashboard/profile"
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/80 py-1.5 pl-2 pr-4 text-xs font-medium text-zinc-300 hover:border-amber-400/40 hover:text-white transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-amber-200 to-amber-500 text-xs font-bold text-zinc-950">
                {initial}
              </span>
              <span>{user.name}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 sm:p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
                Dashboard Mahasiswa
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Selamat Datang, {user.name}
              </h1>
              <p className="mt-1.5 text-sm text-zinc-400">
                Sesi terautentikasi aktif · {user.email}
              </p>
            </div>

            <span className="self-start sm:self-center rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
              {roleLabel}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                NIM
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {user.nim || "Belum diisi"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Status Sesi
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Terverifikasi
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Peran Sistem
              </p>
              <p className="mt-2 text-lg font-semibold text-amber-300">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-6">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Lihat Katalog Produk
            </Link>

            <Link
              href="/dashboard/profile"
              className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/10 hover:brightness-105 transition"
            >
              Buka Kartu Profil Lengkap 
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] text-zinc-400 flex items-center justify-center text-sm">
          Memuat dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
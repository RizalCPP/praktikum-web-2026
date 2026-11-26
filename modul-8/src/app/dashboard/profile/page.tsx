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

async function ProfileContent() {
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

          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition"
          >
             Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div className="h-28 bg-linear-to-r from-zinc-800 via-amber-950/40 to-zinc-900 border-b border-white/10" />

          <div className="px-8 pb-8">
            <div className="-mt-12 mb-5 flex items-end justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#121215] bg-linear-to-br from-amber-200 via-amber-300 to-amber-500 text-3xl font-bold text-zinc-950 shadow-xl">
                {initial}
              </div>

              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
                {roleLabel}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Identitas Terverifikasi · Praktikum Web
              </p>
            </div>

            <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
              <div className="flex items-center justify-between py-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  Nama Lengkap
                </span>
                <span className="text-sm font-medium text-white">
                  {user.name}
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  NIM
                </span>
                <span className="text-sm font-medium text-white">
                  {user.nim ?? "-"}
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  Email
                </span>
                <span className="text-sm font-medium text-white">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  Hak Akses
                </span>
                <span className="text-sm font-medium text-amber-300">
                  {roleLabel}
                </span>
              </div>
            </div>

            <div className="mt-7">
              <Link
                href="/dashboard"
                className="inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] text-zinc-400 flex items-center justify-center text-sm">
          Memuat profil...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
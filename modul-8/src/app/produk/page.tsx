import { Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";

interface SessionPayload {
  id: number;
  name: string;
  nim: string | null;
  email: string;
  role: string;
}

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    code: "PRD-01",
    name: "Modul Praktikum Web Lanjut",
    category: "Akademik",
    price: "Gratis",
    status: "Tersedia",
  },
  {
    id: 2,
    code: "PRD-02",
    name: "Akses Lab Cloud & Database",
    category: "Infrastruktur",
    price: "Terdaftar",
    status: "Aktif",
  },
  {
    id: 3,
    code: "PRD-03",
    name: "Sertifikasi Kompetensi Fullstack",
    category: "Sertifikasi",
    price: "Mahasiswa",
    status: "Dibuka",
  },
];

async function ProdukContent() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("praktikum_session");

  let user: SessionPayload | null = null;
  if (sessionCookie?.value) {
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {
      user = null;
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href={user ? "/dashboard" : "/"}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-white"
          >
            Praktikum Pemrograman Web - Rizal Septiazi 2406034 <span className="text-amber-400">.</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-400/20 transition"
                >
                  {user.name}
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:brightness-105 transition"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
              Katalog Layanan & Produk
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Halaman Produk
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Daftar modul dan fasilitas praktikum yang berhasil dimuat
            </p>
          </div>

          <span className="self-start sm:self-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            ● Terhubung
          </span>
        </div>

        {/* Grid Kartu Produk */}
        <div className="grid gap-5 sm:grid-cols-3">
          {SAMPLE_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-amber-400/40 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400/90">
                    {item.code}
                  </span>
                  <span className="rounded-full border border-white/10 bg-zinc-950/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                    {item.category}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {item.name}
                </h2>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm font-semibold text-amber-300">
                  {item.price}
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={user ? "/dashboard" : "/login"}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            {user ? " Kembali ke Dashboard" : "Masuk ke Portal "}
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function ProdukPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] text-zinc-400 flex items-center justify-center text-sm">
          Memuat halaman produk...
        </div>
      }
    >
      <ProdukContent />
    </Suspense>
  );
}
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { yukler as initialYukler } from "../data/yukler";
import { ALL_EUROPE } from "../data/countries";
import YukForm from "../components/yuk/YukForm";
import YukList from "../components/yuk/YukList";

const LS_ITEMS = "logiway_items_v1";
const LS_FAVS = "logiway_favs_v1";

export default function Home() {
  // items (localStorage destekli)
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_ITEMS);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : initialYukler;
    } catch {
      return initialYukler;
    }
  });

  // favoriler (localStorage destekli)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_FAVS);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_ITEMS, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_FAVS, JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  // filtreler
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [driver, setDriver] = useState("");

  // ekstra: favori filtresi + sıralama + pagination
  const [showFavs, setShowFavs] = useState(false);
  const [sort, setSort] = useState("date_desc"); // date_desc | date_asc | price_desc | price_asc
  const [visibleCount, setVisibleCount] = useState(6);

  const deferredQ = useDeferredValue(q);

  const clearFilters = () => {
    setQ("");
    setFrom("");
    setTo("");
    setDriver("");
    setShowFavs(false);
    setVisibleCount(6);
  };

  const filtered = useMemo(() => {
    let list = [...items];

    // arama
    const s = deferredQ.trim().toLowerCase();
    if (s) {
      list = list.filter((x) =>
        [x.baslik, x.cikisUlke, x.varisUlke, x.yukTipi, x.surucuUlke]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(s))
      );
    }

    // select filtreler
    if (from) list = list.filter((x) => x.cikisUlke === from);
    if (to) list = list.filter((x) => x.varisUlke === to);
    if (driver) list = list.filter((x) => x.surucuUlke === driver);

    // favoriler
    if (showFavs) {
      const favSet = new Set(favoriteIds);
      list = list.filter((x) => favSet.has(x.id));
    }

    // sıralama
    const toTime = (d) => {
      const t = Date.parse(d);
      return Number.isFinite(t) ? t : 0;
    };
    const toNum = (n) => Number(n || 0);

    list.sort((a, b) => {
      if (sort === "date_desc") return toTime(b.tarih) - toTime(a.tarih);
      if (sort === "date_asc") return toTime(a.tarih) - toTime(b.tarih);
      if (sort === "price_desc") return toNum(b.fiyat) - toNum(a.fiyat);
      if (sort === "price_asc") return toNum(a.fiyat) - toNum(b.fiyat);
      return 0;
    });

    return list;
  }, [items, deferredQ, from, to, driver, showFavs, favoriteIds, sort]);

  const paged = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = filtered.length > visibleCount;

  const add = (yeni) => {
    setItems((p) => [yeni, ...p]);
    setVisibleCount((c) => Math.max(c, 6));
  };

  const quickPick = (country) => {
    // hızlı buton: çıkış ülkesini doldurup filtreyi de ayarla
    setFrom(country);
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Logiway Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Avrupa lojistik yük ilanları • Ülke bazlı filtreleme • Şoför konumu (ülke)
          </p>
        </div>

        {/* Üst bar: arama + filtreler */}
        <div className="mb-6 grid gap-3 lg:grid-cols-4">
          <input
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 lg:col-span-1"
            placeholder="Ara: Almanya, Palet, Belçika..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setVisibleCount(6);
            }}
          />

          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setVisibleCount(6);
            }}
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" className="bg-slate-950">
              Çıkış ülkesi (filtre)
            </option>
            {ALL_EUROPE.map((c) => (
              <option key={c} value={c} className="bg-slate-950">
                {c}
              </option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setVisibleCount(6);
            }}
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" className="bg-slate-950">
              Varış ülkesi (filtre)
            </option>
            {ALL_EUROPE.map((c) => (
              <option key={c} value={c} className="bg-slate-950">
                {c}
              </option>
            ))}
          </select>

          <select
            value={driver}
            onChange={(e) => {
              setDriver(e.target.value);
              setVisibleCount(6);
            }}
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" className="bg-slate-950">
              Şoför nerede? (filtre)
            </option>
            {ALL_EUROPE.map((c) => (
              <option key={c} value={c} className="bg-slate-950">
                {c}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="h-11 rounded-xl border border-slate-700 bg-slate-950/40 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 lg:col-span-4"
          >
            Filtreleri Temizle
          </button>
        </div>

        {/* Ek bar: sıralama + favori */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="date_desc" className="bg-slate-950">
              Sırala: Tarih (Yeni → Eski)
            </option>
            <option value="date_asc" className="bg-slate-950">
              Sırala: Tarih (Eski → Yeni)
            </option>
            <option value="price_desc" className="bg-slate-950">
              Sırala: Fiyat (Yüksek → Düşük)
            </option>
            <option value="price_asc" className="bg-slate-950">
              Sırala: Fiyat (Düşük → Yüksek)
            </option>
          </select>

          <button
            type="button"
            onClick={() => setShowFavs((p) => !p)}
            className={`h-11 rounded-xl border px-4 text-sm font-semibold ${
              showFavs
                ? "border-amber-500 bg-amber-500/10 text-amber-200"
                : "border-slate-700 bg-slate-950/40 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {showFavs ? "★ Favoriler (Açık)" : "☆ Sadece Favoriler"}
          </button>
        </div>

        {/* Ana içerik */}
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <YukForm onAdd={add} onQuickPick={quickPick} />

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-xl font-semibold">Aktif İlanlar</h2>
              <p className="text-sm text-slate-400">
                Toplam:{" "}
                <span className="font-semibold text-slate-200">
                  {filtered.length}
                </span>
              </p>
            </div>

            <YukList
              items={paged}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              onClearFilters={clearFilters}
            />

            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 6)}
                className="mt-4 h-11 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                Daha Fazla Göster
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
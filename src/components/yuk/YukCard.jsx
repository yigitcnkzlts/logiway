import { useMemo, useState } from "react";
import Modal from "./Modal";

export default function YukCard({ item, isFavorite, onToggleFavorite }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offer, setOffer] = useState("");

  const priceText = useMemo(
    () => Number(item.fiyat || 0).toLocaleString("tr-TR"),
    [item.fiyat]
  );

  const dateHint = useMemo(() => {
    if (!item.tarih) return null;
    const t = Date.parse(item.tarih);
    if (!Number.isFinite(t)) return null;

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

    const diffDays = Math.round((t - startOfToday) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: "Geçmiş tarih", kind: "danger" };
    if (diffDays <= 2) return { text: "Acele (0-2 gün)", kind: "warn" };
    if (diffDays <= 7) return { text: "Yaklaşıyor (7 gün)", kind: "info" };
    return null;
  }, [item.tarih]);

  const badgeClass =
    dateHint?.kind === "danger"
      ? "border-rose-500/50 bg-rose-500/10 text-rose-200"
      : dateHint?.kind === "warn"
      ? "border-amber-500/50 bg-amber-500/10 text-amber-200"
      : "border-sky-500/50 bg-sky-500/10 text-sky-200";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:bg-slate-900/80 transition">
      {/* ===================== */}
      {/* ÜST KISIM: BAŞLIK + FAVORİ + FİYAT */}
      {/* ===================== */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{item.baslik}</h3>

            {item.yukTipi ? (
              <span className="rounded-full border border-slate-700 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-200">
                {item.yukTipi}
              </span>
            ) : null}

            {dateHint ? (
              <span className={`rounded-full border px-2 py-0.5 text-xs ${badgeClass}`}>
                {dateHint.text}
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-sm text-slate-300">
            <span className="font-medium">{item.cikisUlke}</span> →{" "}
            <span className="font-medium">{item.varisUlke}</span>
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite?.(item.id)}
              className={`rounded-xl border px-3 py-1 text-sm font-semibold ${
                isFavorite
                  ? "border-amber-500 bg-amber-500/10 text-amber-200"
                  : "border-slate-700 bg-slate-950/40 text-slate-200 hover:bg-slate-800"
              }`}
              title={isFavorite ? "Favoriden çıkar" : "Favoriye ekle"}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">Fiyat</p>
          <p className="text-xl font-bold text-emerald-300">{priceText} ₺</p>
        </div>
      </div>

      {/* ===================== */}
      {/* BİLGİ KUTULARI */}
      {/* ===================== */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-950/40 p-3 border border-slate-800">
          <p className="text-slate-400">Yük Tipi</p>
          <p className="font-medium">{item.yukTipi}</p>
        </div>

        <div className="rounded-xl bg-slate-950/40 p-3 border border-slate-800">
          <p className="text-slate-400">Ağırlık</p>
          <p className="font-medium">{item.agirlikKg} kg</p>
        </div>

        <div className="rounded-xl bg-slate-950/40 p-3 border border-slate-800">
          <p className="text-slate-400">Tarih</p>
          <p className="font-medium">{item.tarih || "-"}</p>
        </div>

        <div className="rounded-xl bg-slate-950/40 p-3 border border-slate-800">
          <p className="text-slate-400">Şoför nerede?</p>
          <p className="font-medium">{item.surucuUlke || "-"}</p>
        </div>
      </div>

      {/* ===================== */}
      {/* AÇIKLAMA (Detay Aç/Kapat) */}
      {/* ===================== */}
      {openDetail ? (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs text-slate-400 mb-1">Açıklama</p>
          <p className="text-sm text-slate-200">{item.aciklama || "-"}</p>
        </div>
      ) : item.aciklama ? (
        <p className="mt-4 text-sm text-slate-300 line-clamp-2">{item.aciklama}</p>
      ) : null}

      {/* ===================== */}
      {/* AKSİYON BUTONLARI */}
      {/* ===================== */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setOfferOpen(true)}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Teklif Ver
        </button>

        <button
          type="button"
          onClick={() => setOpenDetail((p) => !p)}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
        >
          {openDetail ? "Kapat" : "Detay"}
        </button>
      </div>

      {/* ===================== */}
      {/* MODAL: TEKLİF VER */}
      {/* ===================== */}
      <Modal
        open={offerOpen}
        title={`Teklif Ver • ${item.cikisUlke} → ${item.varisUlke}`}
        onClose={() => {
          setOfferOpen(false);
          setOffer("");
        }}
      >
        <div className="grid gap-3">
          <p className="text-sm text-slate-300">
            Mevcut fiyat:{" "}
            <span className="font-semibold text-slate-100">{priceText} ₺</span>
          </p>

          <input
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Teklifin (₺)"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />

          <button
            type="button"
            onClick={() => {
              const n = Number(offer);
              if (!Number.isFinite(n) || n <= 0) {
                alert("Geçerli bir teklif gir.");
                return;
              }
              alert(`Teklif alındı: ${n.toLocaleString("tr-TR")} ₺`);
              setOfferOpen(false);
              setOffer("");
            }}
            className="h-11 w-full rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
          >
            Gönder
          </button>
        </div>
      </Modal>
    </div>
  );
}
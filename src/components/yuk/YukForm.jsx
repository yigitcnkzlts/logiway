import { useMemo, useState } from "react";
import { ALL_EUROPE, POPULAR } from "../../data/countries";

const empty = {
  baslik: "",
  cikisUlke: "",
  varisUlke: "",
  surucuUlke: "",
  yukTipi: "",
  agirlikKg: "",
  fiyat: "",
  tarih: "",
  aciklama: "",
};

export default function YukForm({ onAdd, onQuickPick }) {
  const [form, setForm] = useState(empty);
  const [touched, setTouched] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.cikisUlke) e.cikisUlke = "Çıkış ülkesi zorunlu.";
    if (!form.varisUlke) e.varisUlke = "Varış ülkesi zorunlu.";
    if (!form.yukTipi) e.yukTipi = "Yük tipi zorunlu.";
    if (form.agirlikKg && Number(form.agirlikKg) < 0) e.agirlikKg = "Ağırlık negatif olamaz.";
    if (form.fiyat && Number(form.fiyat) < 0) e.fiyat = "Fiyat negatif olamaz.";
    return e;
  }, [form]);

  const hasError = (name) => touched[name] && errors[name];

  const submit = (e) => {
    e.preventDefault();

    setTouched({
      baslik: true,
      cikisUlke: true,
      varisUlke: true,
      surucuUlke: true,
      yukTipi: true,
      agirlikKg: true,
      fiyat: true,
      tarih: true,
      aciklama: true,
    });

    if (errors.cikisUlke || errors.varisUlke || errors.yukTipi) return;

    const yeni = {
      id: Date.now(),
      baslik: form.baslik || `${form.cikisUlke} → ${form.varisUlke}`,
      cikisUlke: form.cikisUlke,
      varisUlke: form.varisUlke,
      surucuUlke: form.surucuUlke || form.cikisUlke,
      yukTipi: form.yukTipi,
      agirlikKg: Number(form.agirlikKg || 0),
      fiyat: Number(form.fiyat || 0),
      tarih: form.tarih || "",
      aciklama: form.aciklama || "",
    };

    onAdd?.(yeni);
    setForm(empty);
    setTouched({});
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="text-lg font-semibold mb-3">Yeni Yük İlanı</h2>

      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-2">Popüler ülkeler (hızlı seç)</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onQuickPick?.(c); // ✅ sadece ; eklendi
                setForm((p) => ({
                  ...p,
                  cikisUlke: c,
                  surucuUlke: p.surucuUlke || c,
                }));
                setTouched((t) => ({ ...t, cikisUlke: true }));
              }}
              className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-3">
        <input
          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Başlık (opsiyonel)"
          name="baslik"
          value={form.baslik}
          onChange={onChange}
          onBlur={() => setTouched((t) => ({ ...t, baslik: true }))}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <select
              name="cikisUlke"
              value={form.cikisUlke}
              onChange={onChange}
              onBlur={() => setTouched((t) => ({ ...t, cikisUlke: true }))}
              className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasError("cikisUlke") ? "border-rose-500" : "border-slate-700"
              }`}
            >
              <option value="" className="bg-slate-950">Çıkış ülkesi seç</option>
              {ALL_EUROPE.map((c) => (
                <option key={c} value={c} className="bg-slate-950">{c}</option>
              ))}
            </select>
            {hasError("cikisUlke") ? (
              <p className="mt-1 text-xs text-rose-300">{errors.cikisUlke}</p>
            ) : null}
          </div>

          <div>
            <select
              name="varisUlke"
              value={form.varisUlke}
              onChange={onChange}
              onBlur={() => setTouched((t) => ({ ...t, varisUlke: true }))}
              className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasError("varisUlke") ? "border-rose-500" : "border-slate-700"
              }`}
            >
              <option value="" className="bg-slate-950">Varış ülkesi seç</option>
              {ALL_EUROPE.map((c) => (
                <option key={c} value={c} className="bg-slate-950">{c}</option>
              ))}
            </select>
            {hasError("varisUlke") ? (
              <p className="mt-1 text-xs text-rose-300">{errors.varisUlke}</p>
            ) : null}
          </div>

          <select
            name="surucuUlke"
            value={form.surucuUlke}
            onChange={onChange}
            onBlur={() => setTouched((t) => ({ ...t, surucuUlke: true }))}
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="" className="bg-slate-950">Şoför nerede? (ülke)</option>
            {ALL_EUROPE.map((c) => (
              <option key={c} value={c} className="bg-slate-950">{c}</option>
            ))}
          </select>

          <div>
            <input
              className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasError("yukTipi") ? "border-rose-500" : "border-slate-700"
              }`}
              placeholder="Yük tipi (Palet / Koli...)"
              name="yukTipi"
              value={form.yukTipi}
              onChange={onChange}
              onBlur={() => setTouched((t) => ({ ...t, yukTipi: true }))}
            />
            {hasError("yukTipi") ? (
              <p className="mt-1 text-xs text-rose-300">{errors.yukTipi}</p>
            ) : null}
          </div>

          <div>
            <input
              className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasError("agirlikKg") ? "border-rose-500" : "border-slate-700"
              }`}
              placeholder="Ağırlık (kg)"
              name="agirlikKg"
              value={form.agirlikKg}
              onChange={onChange}
              onBlur={() => setTouched((t) => ({ ...t, agirlikKg: true }))}
            />
            {hasError("agirlikKg") ? (
              <p className="mt-1 text-xs text-rose-300">{errors.agirlikKg}</p>
            ) : null}
          </div>

          <div>
            <input
              className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasError("fiyat") ? "border-rose-500" : "border-slate-700"
              }`}
              placeholder="Fiyat (₺)"
              name="fiyat"
              value={form.fiyat}
              onChange={onChange}
              onBlur={() => setTouched((t) => ({ ...t, fiyat: true }))}
            />
            {hasError("fiyat") ? (
              <p className="mt-1 text-xs text-rose-300">{errors.fiyat}</p>
            ) : null}
          </div>

          <input
            type="date"
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            name="tarih"
            value={form.tarih}
            onChange={onChange}
            onBlur={() => setTouched((t) => ({ ...t, tarih: true }))}
          />

          <input
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 sm:col-span-2"
            placeholder="Açıklama (opsiyonel)"
            name="aciklama"
            value={form.aciklama}
            onChange={onChange}
            onBlur={() => setTouched((t) => ({ ...t, aciklama: true }))}
          />
        </div>

        <button className="mt-1 h-11 w-full rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
          İlanı Yayınla
        </button>
      </form>
    </div>
  );
}
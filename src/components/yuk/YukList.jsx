import YukCard from "./YukCard";

export default function YukList({ items, favoriteIds = [], onToggleFavorite, onClearFilters }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
        <p className="font-semibold">Kayıt bulunamadı.</p>

        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 h-11 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
        >
          Filtreleri Temizle
        </button>
      </div>
    );
  }

  const favSet = new Set(favoriteIds);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <YukCard
          key={item.id}
          item={item}
          isFavorite={favSet.has(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
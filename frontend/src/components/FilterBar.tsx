import type { VendorFilters } from '../types/api'

interface FilterBarProps {
  filters: VendorFilters
  onChange: (filters: VendorFilters) => void
}

const tagOptions = ['', 'Estudio', 'Freelance', 'Premium', 'Económico']

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const setTag = (tag: string) => onChange({ ...filters, tag: tag || undefined })

  return (
    <div className="sticky top-15 z-40 border-b border-(--border) bg-white">
      <div className="mx-auto flex h-13 w-full max-w-300 items-center gap-2 overflow-x-auto px-4 md:px-8">
        {tagOptions.map((tag) => {
          const active = (filters.tag ?? '') === tag
          return (
            <button
              key={tag || 'todos'}
              onClick={() => setTag(tag)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs transition ${
                active
                  ? 'border-(--ink) bg-(--ink) text-(--cream)'
                  : 'border-(--border) text-(--mid) hover:bg-(--cream2)'
              }`}
            >
              {tag || 'Todos'}
            </button>
          )
        })}

        <div className="mx-1 h-5 w-px shrink-0 bg-(--border)" />

        <select
          value={filters.sort ?? 'rating'}
          onChange={(e) => onChange({ ...filters, sort: (e.currentTarget.value || undefined) as VendorFilters['sort'] })}
          className="bg-transparent px-2 text-xs text-(--mid) outline-none"
        >
          <option value="rating">Mejor calificados</option>
          <option value="price_asc">Menor precio</option>
          <option value="price_desc">Mayor precio</option>
          <option value="reviews">Más reseñas</option>
        </select>
      </div>
    </div>
  )
}
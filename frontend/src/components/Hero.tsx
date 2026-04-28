import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative mt-15 overflow-hidden bg-(--ink) px-4 pb-14 pt-20 text-center md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(184,146,58,.14),transparent_65%)]" />
      <div className="relative mx-auto max-w-225">
        <div className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-(--gold-l)">
          <span className="h-px w-6 bg-(--gold)" />
          Directorio verificado · Sonora 2025
          <span className="h-px w-6 bg-(--gold)" />
        </div>

        <h1 className="font-display text-4xl font-normal leading-tight text-(--cream) md:text-6xl">
          Encuentra al fotógrafo perfecto para tu <em className="text-(--gold-l)">graduación</em>
        </h1>

        <p className="mx-auto mt-4 max-w-130 text-sm text-[rgba(253,251,246,.55)] md:text-base">
          Compara estudios, lee reseñas reales y reserva con total confianza.
        </p>

        <div className="mx-auto mt-8 flex max-w-155 flex-col overflow-hidden rounded-md bg-(--cream) shadow-2xl md:flex-row">
          <input
            className="flex-1 px-4 py-3 text-sm text-(--ink) outline-none"
            placeholder="Ciudad, nombre del estudio…"
          />
          <button className="bg-(--gold) px-6 py-3 text-sm font-medium text-white hover:bg-(--gold-l)">
            Buscar
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          <div><div className="font-display text-2xl text-(--gold-l)">38</div><div className="text-xs text-white/40">Estudios verificados</div></div>
          <div><div className="font-display text-2xl text-(--gold-l)">4.8★</div><div className="text-xs text-white/40">Calificación promedio</div></div>
          <div><div className="font-display text-2xl text-(--gold-l)">5,000+</div><div className="text-xs text-white/40">Graduados felices</div></div>
          <div><div className="font-display text-2xl text-(--gold-l)">Gratis</div><div className="text-xs text-white/40">Sin comisión para ti</div></div>
        </div>
      </div>
    </section>
  )
}
import { Link } from 'react-router-dom'

export interface PackageItem {
  id: number
  vendorId: number
  name: string
  description: string
  price: number
  duration: string
  includes?: string[]
  availability?: string
  vendorName?: string
  featured?: boolean
}

interface PackageGridProps {
  packages: PackageItem[]
  title?: string
  subtitle?: string
}

export default function PackageGrid({
  packages,
  title = 'Paquetes destacados',
  subtitle = 'Compara opciones y elige el paquete que mejor encaje con tu graduación.',
}: PackageGridProps) {
  if (!packages.length) {
    return (
      <section id="packages" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-3 text-slate-600">
            Todavía no hay paquetes disponibles para estos filtros.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-3 text-slate-600">{subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((packageItem) => (
          <article
            key={packageItem.id}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-sm text-slate-500">
                  {packageItem.vendorName || 'Fotógrafo'}
                </p>
                <h3 className="text-xl font-semibold text-slate-900">
                  {packageItem.name}
                </h3>
              </div>

              {packageItem.featured && (
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  Recomendado
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col px-6 py-5">
              <p className="text-sm leading-6 text-slate-600">
                {packageItem.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {packageItem.duration}
                </span>
                {packageItem.availability && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {packageItem.availability}
                  </span>
                )}
              </div>

              {packageItem.includes && packageItem.includes.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-900">Incluye</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {packageItem.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Desde</p>
                    <p className="text-3xl font-semibold tracking-tight text-slate-900">
                      ${packageItem.price}
                    </p>
                  </div>

                  <Link
                    to={`/vendor/${packageItem.vendorId}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
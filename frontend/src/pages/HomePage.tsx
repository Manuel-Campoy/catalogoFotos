import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import FilterBar from '../components/FilterBar'
import PackageGrid, { type PackageItem } from '../components/PackageGrid'
import { vendorService } from '../services/vendorService'
import { packageService } from '../services/packageService'
import type { Vendor, Package, VendorFilters } from '../types/api'

type PackageWithVendor = PackageItem & {
  vendorCity?: string
  vendorTag?: string
  vendorRating?: number
}

function mapPackageToCard(pkg: Package, vendor?: Vendor): PackageWithVendor {
  return {
    id: pkg.id,
    vendorId: pkg.vendorId,
    vendorName: vendor?.name ?? 'Fotógrafo',
    vendorCity: vendor?.city,
    vendorTag: vendor?.tag,
    vendorRating: vendor?.rating,
    name: pkg.name,
    description: pkg.description,
    price: pkg.price,
    duration: pkg.duration,
    includes: pkg.includes,
    availability: pkg.availability,
    featured: false,
  }
}

export default function HomePage() {
  const [filters, setFilters] = useState<VendorFilters>({})
  const [packages, setPackages] = useState<PackageWithVendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      try {
        setLoading(true)
        setError(null)

        const vendors = await vendorService.getVendors()

        const packagesByVendor = await Promise.all(
          vendors.map(async (vendor) => {
            const vendorPackages = await packageService.getVendorPackages(vendor.id)
            return vendorPackages.map((pkg) => mapPackageToCard(pkg, vendor))
          })
        )

        const flatPackages = packagesByVendor.flat()

        if (isMounted) {
          setPackages(flatPackages)
        }
      } catch {
        if (isMounted) {
          setError('No se pudieron cargar los paquetes destacados.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadHomeData()

    return () => {
      isMounted = false
    }
  }, [])

  const visiblePackages = useMemo(() => {
    const search = filters.search?.toLowerCase().trim()
    const city = filters.city?.toLowerCase().trim()
    const tag = filters.tag?.toLowerCase().trim()

    const filtered = packages.filter((pkg) => {
      const matchesSearch =
        !search ||
        pkg.name.toLowerCase().includes(search) ||
        pkg.description.toLowerCase().includes(search) ||
        (pkg.vendorName ?? '').toLowerCase().includes(search)

      const matchesCity = !city || (pkg.vendorCity ?? '').toLowerCase().includes(city)

      const matchesTag = !tag || (pkg.vendorTag ?? '').toLowerCase().includes(tag)

      return matchesSearch && matchesCity && matchesTag
    })

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'price_asc':
          return a.price - b.price
        case 'price_desc':
          return b.price - a.price
        case 'rating':
          return (b.vendorRating ?? 0) - (a.vendorRating ?? 0)
        case 'reviews':
          return 0
        default:
          return 0
      }
    })

    return sorted
  }, [filters, packages])

  const featured = visiblePackages.slice(0, 2)
  const directory = visiblePackages.slice(2)

  return (
    <>
      <Hero />

      <FilterBar filters={filters} onChange={setFilters} />

      <main className="mx-auto max-w-300 px-4 pb-20 pt-12 md:px-8" id="vendors">
        <section className="mb-10">
          <div className="mb-4">
            <span className="eye">Destacados</span>
            <h2 className="font-display text-3xl font-normal text-(--ink)">
              Estudios recomendados
            </h2>
          </div>

          {loading && (
            <div className="card-border rounded-xl bg-white p-10 text-center text-(--mid)">
              Cargando destacados...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && featured.length > 0 && (
            <PackageGrid
              packages={featured}
              title="Selección curada"
              subtitle="Los proveedores mejor valorados para empezar tu búsqueda."
            />
          )}
        </section>

        <section className="mb-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="eye">Directorio completo</span>
              <h2 className="font-display text-3xl font-normal text-(--ink)">
                Todos los proveedores
              </h2>
            </div>
            <span className="text-xs text-(--muted)">
              {visiblePackages.length} resultados
            </span>
          </div>

          {!loading && !error && directory.length > 0 && (
            <PackageGrid
              packages={directory}
              title="Paquetes disponibles"
              subtitle="Compara precios, cobertura y disponibilidad."
            />
          )}

          {!loading && !error && visiblePackages.length === 0 && (
            <div className="py-14 text-center text-(--muted)">
              <div className="mb-3 text-4xl">🔍</div>
              <p>No encontramos proveedores con esos filtros.</p>
            </div>
          )}
        </section>

        <section id="about" className="rounded-xl bg-(--ink) px-6 py-10 md:px-10">
          <div className="mx-auto max-w-225 text-center">
            <div className="mb-3 eye text-(--gold-l)">Proceso simple</div>
            <h2 className="font-display text-3xl font-normal text-(--cream)">
              ¿Cómo funciona GradLens?
            </h2>
            <p className="mt-2 text-sm text-[rgba(253,251,246,.45)]">
              Conectamos graduados con los mejores fotógrafos de Sonora.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(184,146,58,.3)] text-xl">🔍</div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.12em] text-(--gold-l)">Paso 1</div>
                <div className="text-sm font-medium text-(--cream)">Explora</div>
                <p className="mt-1 text-xs text-[rgba(253,251,246,.4)]">
                  Compara estudios, portafolios y paquetes fácilmente
                </p>
              </div>

              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(184,146,58,.3)] text-xl">⭐</div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.12em] text-(--gold-l)">Paso 2</div>
                <div className="text-sm font-medium text-(--cream)">Lee reseñas</div>
                <p className="mt-1 text-xs text-[rgba(253,251,246,.4)]">
                  Opiniones verificadas de graduados como tú
                </p>
              </div>

              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(184,146,58,.3)] text-xl">📅</div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.12em] text-(--gold-l)">Paso 3</div>
                <div className="text-sm font-medium text-(--cream)">Reserva</div>
                <p className="mt-1 text-xs text-[rgba(253,251,246,.4)]">
                  Contacta directo al proveedor y agenda tu sesión
                </p>
              </div>

              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(184,146,58,.3)] text-xl">📸</div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.12em] text-(--gold-l)">Paso 4</div>
                <div className="text-sm font-medium text-(--cream)">¡Disfruta!</div>
                <p className="mt-1 text-xs text-[rgba(253,251,246,.4)]">
                  Vive tu sesión y recibe fotos increíbles
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
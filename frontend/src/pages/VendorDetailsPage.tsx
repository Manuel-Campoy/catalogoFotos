import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { vendorService } from '../services/vendorService'
import { packageService } from '../services/packageService'
import { reviewService, type Review } from '../services/reviewService'
import ReviewForm from '../components/ReviewForm'
import ReviewList from '../components/ReviewList'
import type { Vendor, Package } from '../types/api'
import ReservationForm from '../components/ReservationForm'

export default function VendorDetailsPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const vendorId = Number(id)

  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [packages, setPackages] = useState<Package[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadReviews = async (currentVendorId: number) => {
    const reviewsData = await reviewService.getVendorReviews(currentVendorId)
    setReviews(reviewsData)
  }

  useEffect(() => {
    let isMounted = true

    const loadVendorDetails = async () => {
      if (!vendorId || Number.isNaN(vendorId)) {
        if (isMounted) {
          setError('Vendedor inválido.')
          setLoading(false)
        }
        return
      }

      try {
        setLoading(true)
        setError(null)

        const [vendorData, packagesData, reviewsData] = await Promise.all([
          vendorService.getVendorById(vendorId),
          packageService.getVendorPackages(vendorId),
          reviewService.getVendorReviews(vendorId),
        ])

        if (isMounted) {
          setVendor(vendorData)
          setPackages(packagesData)
          setReviews(reviewsData)
        }
      } catch {
        if (isMounted) {
          setError('No se pudo cargar la información del vendedor.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadVendorDetails()

    return () => {
      isMounted = false
    }
  }, [vendorId])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          Cargando detalle del vendedor...
        </div>
      </div>
    )
  }

  if (error || !vendor) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          <p>{error ?? 'Vendedor no encontrado.'}</p>
          <Link to="/" className="mt-4 inline-block font-semibold text-slate-900 underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← Volver al inicio
        </Link>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div
          className="px-6 py-8 sm:px-10 sm:py-12"
          style={{
            background: vendor.bgColor || 'linear-gradient(135deg, #0f172a, #1e293b)',
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-5xl">{vendor.emoji || '📸'}</div>
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                {vendor.name}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-200">
                {vendor.description}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 text-white backdrop-blur">
              <p className="text-sm text-slate-200">Desde</p>
              <p className="text-3xl font-semibold">${vendor.startPrice}</p>
              <p className="mt-1 text-sm text-slate-200">{vendor.city}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              {vendor.category && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {vendor.category}
                </span>
              )}
              {vendor.tag && (
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  {vendor.tag}
                </span>
              )}
              {vendor.rating !== undefined && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {vendor.rating.toFixed(1)} / 5
                </span>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-900">Paquetes disponibles</h2>

              {packages.length === 0 ? (
                <p className="mt-4 text-slate-600">
                  Este vendedor todavía no tiene paquetes publicados.
                </p>
              ) : (
                <div className="mt-6 grid gap-4">
                  {packages.map((pkg) => (
                    <article
                      key={pkg.id}
                      className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {pkg.name}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {pkg.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                              {pkg.duration}
                            </span>
                            {pkg.availability && (
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                {pkg.availability}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm text-slate-500">Precio</p>
                          <p className="text-2xl font-semibold text-slate-900">
                            ${pkg.price}
                          </p>
                        </div>
                      </div>

                      {pkg.includes && pkg.includes.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-slate-900">Incluye</p>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600">
                            {pkg.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 rounded-3xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Contacto</h2>

            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-medium">Ciudad:</span> {vendor.city}
              </p>
              <p>
                <span className="font-medium">Contacto:</span> {vendor.contact}
              </p>
              <p>
                <span className="font-medium">Verificado:</span> {vendor.verified ? 'Sí' : 'No'}
              </p>
              <p>
                <span className="font-medium">Destacado:</span> {vendor.featured ? 'Sí' : 'No'}
              </p>
            </div>

            <button className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Reservar o consultar
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Reseñas</p>
              <p className="mt-2 text-sm text-slate-600">
                Lee lo que otros usuarios han opinado sobre este vendedor.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ReservationForm
          vendorId={vendorId}
          packages={packages}
          onReservationCreated={() => {
            // Si luego quieres, aquí puedes recargar reservas del usuario
          }}
        />

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Opiniones recientes</h2>
            <p className="mt-2 text-sm text-slate-600">
              Estas reseñas se actualizan automáticamente al publicar o eliminar una opinión.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Inicia sesión para publicar o eliminar reseñas.
            </div>
          )}

          <ReviewList
            reviews={reviews}
            onReviewDeleted={() => loadReviews(vendorId)}
          />
        </div>
      </section>
    </div>
  )
}
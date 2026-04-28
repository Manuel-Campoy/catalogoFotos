import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { reviewService } from '../services/reviewService'

interface ReviewFormProps {
  vendorId: number
  onReviewCreated?: () => void
}

export default function ReviewForm({ vendorId, onReviewCreated }: ReviewFormProps) {
  const { isAuthenticated, loading: authLoading } = useAuth()

  const [packageName, setPackageName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isDisabled = !isAuthenticated || authLoading || loading

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isAuthenticated) {
      setError('Debes iniciar sesión para dejar una reseña.')
      return
    }

    if (!packageName.trim()) {
      setError('El nombre del paquete es requerido.')
      return
    }

    if (!text.trim()) {
      setError('La reseña no puede estar vacía.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      await reviewService.createReview(vendorId, {
        packageName: packageName.trim(),
        rating,
        text: text.trim(),
      })

      setPackageName('')
      setRating(5)
      setText('')
      onReviewCreated?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la reseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Dejar una reseña</h3>
      <p className="mt-2 text-sm text-slate-600">
        Comparte tu experiencia con este fotógrafo.
      </p>

      {!isAuthenticated && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Debes iniciar sesión para publicar una reseña.
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <fieldset disabled={isDisabled} className="mt-5 grid gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Paquete usado</span>
          <input
            type="text"
            value={packageName}
            onChange={(event) => setPackageName(event.currentTarget.value)}
            placeholder="Ej. Paquete Premium"
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Calificación</span>
          <select
            value={rating}
            onChange={(event) => setRating(Number(event.currentTarget.value))}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} estrella{value > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Tu opinión</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            rows={5}
            placeholder="Cuéntanos cómo fue tu experiencia..."
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={isDisabled}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Publicando...' : 'Publicar reseña'}
      </button>
    </form>
  )
}
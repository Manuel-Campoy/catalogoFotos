import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { reviewService, type Review } from '../services/reviewService'

interface ReviewListProps {
  reviews: Review[]
  onReviewDeleted?: () => void
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
  }).format(new Date(dateValue))
}

export default function ReviewList({
  reviews,
  onReviewDeleted,
}: ReviewListProps) {
  const { user, isAuthenticated } = useAuth()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (reviewId: number) => {
    try {
      setDeletingId(reviewId)
      setError(null)
      await reviewService.deleteReview(reviewId)
      onReviewDeleted?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar la reseña.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!reviews.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        Todavía no hay reseñas para este vendedor.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {reviews.map((review) => {
        const canDelete = isAuthenticated && user?.id === review.userId

        return (
          <article
            key={review.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {review.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {review.user?.name ?? 'Usuario'}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                {review.rating}/5
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700">Paquete</p>
              <p className="text-slate-900">{review.packageName}</p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">{review.text}</p>

            {canDelete && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => handleDelete(review.id)}
                  disabled={deletingId === review.id}
                  className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === review.id ? 'Eliminando...' : 'Eliminar reseña'}
                </button>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
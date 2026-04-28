import { useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { reservationService } from '../services/reservationService'
import type { Package } from '../types/api'

interface ReservationFormProps {
  vendorId: number
  packages: Package[]
  onReservationCreated?: () => void
}

export default function ReservationForm({
  vendorId,
  packages,
  onReservationCreated,
}: ReservationFormProps) {
  const { user, isAuthenticated } = useAuth()
  const [packageId, setPackageId] = useState<number>(packages[0]?.id ?? 0)
  const [contactEmail, setContactEmail] = useState(user?.email ?? '')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isDisabled = useMemo(() => !isAuthenticated || loading, [isAuthenticated, loading])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isAuthenticated) {
      setError('Debes iniciar sesión para reservar.')
      return
    }

    if (!packageId) {
      setError('Selecciona un paquete.')
      return
    }

    if (!contactEmail.trim()) {
      setError('El correo de contacto es requerido.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      await reservationService.createReservation(vendorId, {
        packageId,
        contactEmail: contactEmail.trim(),
        notes: notes.trim() || undefined,
      })

      setNotes('')
      onReservationCreated?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la reserva.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-slate-900">Reservar servicio</h3>
      <p className="mt-2 text-sm text-slate-600">
        Selecciona un paquete y deja tu contacto para coordinar la reserva.
      </p>

      {!isAuthenticated && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Inicia sesión para crear una reserva.
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <fieldset disabled={isDisabled} className="mt-5 grid gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Paquete</span>
          <select
            value={packageId}
            onChange={(event) => setPackageId(Number(event.currentTarget.value))}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            {packages.length === 0 ? (
              <option value={0}>No hay paquetes disponibles</option>
            ) : (
              packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - ${pkg.price}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Correo de contacto</span>
          <input
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.currentTarget.value)}
            placeholder="tuemail@correo.com"
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Notas opcionales</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.currentTarget.value)}
            rows={4}
            placeholder="Cuéntanos fecha tentantiva, dudas o requerimientos especiales..."
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={isDisabled || packages.length === 0}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Enviando...' : 'Crear reserva'}
      </button>
    </form>
  )
}
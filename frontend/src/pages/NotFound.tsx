import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
          404
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Página no encontrada
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600">
          La ruta que intentas abrir no existe o fue movida. Vuelve al inicio para seguir explorando fotógrafos y paquetes.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Volver al inicio
          </Link>

          <a
            href="#vendors"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Ver fotógrafos
          </a>
        </div>
      </div>
    </div>
  )
}
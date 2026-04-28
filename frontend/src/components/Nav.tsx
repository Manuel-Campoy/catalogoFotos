import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

export default function Nav() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 h-15 top-glass">
        <div className="mx-auto flex h-full w-full max-w-300 items-center justify-between gap-6 px-4 md:px-8">
          <Link to="/" className="font-display text-xl font-bold text-(--ink)">
            Grad<span className="text-(--gold)">Lens</span>
            <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.12em] text-(--muted)">Mx</span>
          </Link>

          <div className="relative hidden w-full max-w-85 flex-1 md:block">
            <input
              type="text"
              placeholder="Buscar fotógrafo o ciudad…"
              className="w-full rounded-full border border-(--border) bg-(--cream2) px-4 py-2 text-sm outline-none focus:border-(--gold-l)"
            />
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-md border border-(--border2) px-4 py-2 text-sm text-(--ink) hover:bg-(--cream2)"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-md bg-(--ink) px-4 py-2 text-sm text-(--cream) hover:bg-(--ink2)"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <span className="hidden text-sm text-(--mid) md:inline">
                  Hola, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md border border-(--border2) px-4 py-2 text-sm text-(--ink) hover:bg-(--cream2)"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}
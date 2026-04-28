import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-(--ink2) px-4 pb-6 pt-10 md:px-8">
      <div className="mx-auto flex w-full max-w-300 flex-wrap items-center justify-between gap-4">
        <div className="font-display text-lg font-bold text-(--cream)">
          Grad<span className="text-(--gold)">Lens</span>
          <span className="ml-2 text-xs font-normal text-white/30">México</span>
        </div>
        <div className="flex gap-5 text-xs text-white/40">
          <a href="#">Para fotógrafos</a>
          <a href="#">Privacidad</a>
          <a href="#">Contacto</a>
          <a href="#">Blog</a>
        </div>
      </div>
      <div className="mx-auto mt-5 w-full max-w-300 border-t border-white/10 pt-4 text-center text-[11px] text-white/25">
        © 2025 GradLens · Hermosillo, Sonora · Todos los derechos reservados
      </div>
    </footer>
  )
}
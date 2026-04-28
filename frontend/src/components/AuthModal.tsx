import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../hooks/useNotification'
import '../styles/auth.css'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [localError, setLocalError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { success } = useNotification()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })

  const { login, register, loading, error: authError } = useAuth()
  const error = localError || authError

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
    setLocalError('')
    setSuccessMsg('')
  }

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode)
    setLocalError('')
    setSuccessMsg('')
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    setSuccessMsg('')

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password)
      } else {
        if (!formData.fullName.trim()) {
          setLocalError('El nombre es requerido')
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setLocalError('Las contraseñas no coinciden')
          return
        }
        if (formData.password.length < 6) {
          setLocalError('La contraseña debe tener al menos 6 caracteres')
          return
        }
        
        await register(formData.fullName, formData.email, formData.password)
      }
      setSuccessMsg('¡Autenticación exitosa!')
      success('Autenticación exitosa')
      setTimeout(() => onClose(), 500)
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error de autenticación')
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`auth-ovl ${isOpen ? 'open' : ''}`}
      id="auth-ovl"
      onClick={handleOverlayClick}
    >
      <div className="auth-modal">
        <button className="auth-x" onClick={onClose}>
          ×
        </button>
        
        <div className="auth-logo">
          Grad<span>Lens</span>
        </div>
        <p className="auth-sub">Accede para reservar y dejar reseñas</p>

        <div className="a-tabs">
          <div
            className={`a-tab ${mode === 'login' ? 'on' : ''}`}
            onClick={() => handleSwitchMode('login')}
          >
            Iniciar sesión
          </div>
          <div
            className={`a-tab ${mode === 'register' ? 'on' : ''}`}
            onClick={() => handleSwitchMode('register')}
          >
            Registrarse
          </div>
        </div>

        {/* LOGIN PANEL */}
        <div className={`a-panel ${mode === 'login' ? 'on' : ''}`} id="ap-login">
          {error && (
            <div className="alert show err">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="alert show ok">
              {successMsg}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="f-field">
              <label className="f-label">Correo</label>
              <input
                className="f-ctrl"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="f-field">
              <label className="f-label">Contraseña</label>
              <input
                className="f-ctrl"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-auth-full"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Entrar'}
            </button>
          </form>

          <div className="a-switch">
            ¿Sin cuenta?{' '}
            <a onClick={() => handleSwitchMode('register')}>
              Regístrate gratis
            </a>
          </div>
        </div>

        {/* REGISTER PANEL */}
        <div className={`a-panel ${mode === 'register' ? 'on' : ''}`} id="ap-reg">
          {error && (
            <div className="alert show err">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="alert show ok">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="f-field">
              <label className="f-label">Nombre completo</label>
              <input
                className="f-ctrl"
                type="text"
                name="fullName"
                placeholder="Tu nombre"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="f-field">
              <label className="f-label">Correo</label>
              <input
                className="f-ctrl"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="f-field">
              <label className="f-label">Contraseña</label>
              <input
                className="f-ctrl"
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="f-field">
              <label className="f-label">Confirmar contraseña</label>
              <input
                className="f-ctrl"
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-auth-full"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="a-switch">
            ¿Ya tienes cuenta?{' '}
            <a onClick={() => handleSwitchMode('login')}>
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
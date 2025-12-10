import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as doRegister } from '../services/authService.js'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!username || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (!validateEmail(email)) {
      setError('Email inválido')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      setLoading(true)

      await doRegister({
        name: username,
        email,
        password
      })

      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Error inesperado'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl mb-6 text-center font-bold">Registro</h1>

      <form onSubmit={submit} className="space-y-4 bg-gray-800 p-6 rounded shadow-lg">
        {error && (
          <div className="bg-red-700/40 text-red-300 p-2 rounded text-center">
            {error}
          </div>
        )}

        <input
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-green-500 outline-none"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />

        <input
          type="email"
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-green-500 outline-none"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-green-500 outline-none"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-green-500 outline-none"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white font-bold transition
            ${loading ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
          `}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  )
}
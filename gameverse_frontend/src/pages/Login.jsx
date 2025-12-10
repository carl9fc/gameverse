import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as doLogin } from '../services/authService.js'
import useAuth from '../hooks/useAuth.js'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Email y contraseña son obligatorios')
      return
    }

    if (!validateEmail(email)) {
      setError('Email inválido')
      return
    }

    try{
      setLoading(true)
      const res = await doLogin({ email, password }) // axios response or fetch result
      // pasar la respuesta completa o res.data al hook para que guarde token+user
      login(res) // o login(res.data)
      navigate('/')
    }catch(err){
      setError(err.response?.data?.message || err.message || 'Error en la autenticación')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl mb-6 text-center font-bold">Iniciar sesión</h1>
      <form onSubmit={submit} className="space-y-4 bg-gray-800 p-6 rounded shadow-lg">
        {error && (
          <div className="bg-red-700/40 text-red-300 p-2 rounded text-center">
            {error}
          </div>
        )}
        <input 
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-blue-500 outline-none" 
          type="email"
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)}
          disabled={loading}
        />
        <input 
          type="password" 
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-blue-500 outline-none" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e=>setPassword(e.target.value)}
          disabled={loading}
        />
        <button 
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white font-bold transition
            ${loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="text-center text-sm text-gray-400">
          ¿No tienes cuenta?{' '}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Registrarse
          </span>
        </p>
      </form>
    </div>
  )
}
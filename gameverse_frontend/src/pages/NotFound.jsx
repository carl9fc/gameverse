import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="text-white p-10 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-400 text-xl mb-6">Página no encontrada</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
      >
        Volver al inicio
      </button>
    </div>
  )
}
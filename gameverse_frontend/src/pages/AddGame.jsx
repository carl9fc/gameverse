import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../services/gameService.js'
import useAuth from '../hooks/useAuth.js'

export default function AddGame() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    platform: '',
    year: '',
    image_url: ''
  })

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center mt-10 text-red-400">
        <p>Acceso denegado. Solo administradores pueden agregar juegos.</p>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!formData.title || !formData.genre || !formData.platform) {
      setError('Título, género y plataforma son obligatorios')
      return
    }
    try {
      setLoading(true)
      await createGame(formData)
      navigate('/games')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al crear el juego')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Juego</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg space-y-4">
        {error && <div className="bg-red-700/40 text-red-300 p-2 rounded text-center">{error}</div>}

        <div>
          <label className="block text-sm text-gray-400 mb-2">Título *</label>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" rows="4" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Género *</label>
            <input name="genre" value={formData.genre} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Plataforma *</label>
            <input name="platform" value={formData.platform} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Año</label>
            <input name="year" type="number" value={formData.year} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">URL Imagen</label>
            <input name="image_url" type="url" value={formData.image_url} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded" />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className={`flex-1 p-3 rounded text-white font-bold ${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Guardando...' : 'Agregar Juego'}
          </button>
          <button type="button" onClick={() => navigate('/games')} className="flex-1 p-3 rounded text-white bg-gray-600 hover:bg-gray-700">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
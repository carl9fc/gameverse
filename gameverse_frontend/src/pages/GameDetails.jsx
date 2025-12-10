import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGame } from '../services/gameService.js'
import { listReviews, createReview, deleteReview } from '../services/reviewService.js'
import useAuth from '../hooks/useAuth.js'

export default function GameDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', comment: '', rating: 5 })
  const [error, setError] = useState(null)

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    try {
      setLoading(true)
      const g = await getGame(id)
      setGame(g.data || g) // depende de tu service
      const rv = await listReviews(id)
      setReviews(rv || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!user) return setError('Debes iniciar sesión para dejar una reseña')
    if (!form.comment || !form.comment.trim()) return setError('Comentario requerido')
    try {
      await createReview(id, { title: form.title, comment: form.comment, rating: Number(form.rating) })
      setForm({ title: '', comment: '', rating: 5 })
      await load()
    } catch (err) {
      setError(err.message || 'Error al crear reseña')
    }
  }

  const handleDelete = async (reviewId) => {
    if (!user) return
    try {
      await deleteReview(reviewId)
      setReviews(prev => prev.filter(r => r.id !== reviewId))
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al eliminar reseña')
    }
  }

  if (loading) return <div className="p-6">Cargando...</div>
  if (!game) return <div className="p-6">Juego no encontrado</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{game.title}</h1>
      <p className="text-sm text-gray-300 mb-4">{game.description}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Reseñas</h2>

        {reviews.length === 0 && <p className="text-sm text-gray-400">No hay reseñas aún.</p>}

        <ul className="space-y-4">
          {reviews.map(r => (
            <li key={r.id} className="bg-gray-800 p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <strong>{r.title || 'Sin título'}</strong>
                  <div className="text-sm text-gray-400">Por {r.author?.name || 'Usuario'} • {new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-yellow-400">{r.rating}/5</div>
              </div>
              <p className="mt-2 text-gray-200">{r.comment}</p>

              {(user && (user.role === 'admin' || user.id === r.userId)) && (
                <div className="mt-3">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-400 text-sm bg-red-900/20 px-3 py-1 rounded"
                  >
                    Eliminar reseña
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-800 p-4 rounded">
        <h3 className="font-semibold mb-2">Dejar una reseña</h3>

        {error && <div className="mb-2 text-red-400">{error}</div>}

        {!user ? (
          <div className="text-sm text-gray-400">Debes iniciar sesión para agregar una reseña.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título (opcional)"
              className="w-full p-2 bg-gray-700 rounded"
            />
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Tu reseña..."
              className="w-full p-2 bg-gray-700 rounded"
              rows={4}
              required
            />
            <div className="flex items-center gap-3">
              <label className="text-sm">Puntaje:</label>
              <select name="rating" value={form.rating} onChange={handleChange} className="p-2 bg-gray-700 rounded">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <button type="submit" className="ml-auto bg-blue-600 px-4 py-2 rounded text-white">Enviar</button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

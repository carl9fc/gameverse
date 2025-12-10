import { useEffect, useState } from 'react'
import { listGames } from '../services/gameService.js'
import GameCard from '../components/GameCard.jsx'

export default function Games() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const res = await listGames({search, limit: 50})
        setGames(res.data.results || res.data)
      }catch(e){
        console.error(e)
        setError('Error al cargar los juegos')
      }finally{
        setLoading(false)
      }
    })()
  },[search])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Todos los Juegos</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded focus:ring focus:ring-blue-500 outline-none"
        />
      </div>

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      
      {!loading && games.length === 0 && (
        <p className="text-center text-gray-400">No se encontraron juegos</p>
      )}

      {!loading && games.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map(g=> <GameCard key={g.id} game={g} />)}
        </div>
      )}
    </div>
  )
}

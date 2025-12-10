import { useEffect, useState } from 'react'
import { listGames } from '../services/gameService.js'
import GameCard from '../components/GameCard.jsx'

export default function Home(){
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const res = await listGames({limit:12})
        setGames(res.data.results || res.data)
      }catch(e){ 
        console.error(e)
        setError('Error al cargar los juegos')
      }finally{
        setLoading(false)
      }
    })()
  },[])

  if(loading) return <div className="text-center mt-10"><p>Cargando juegos...</p></div>
  if(error) return <div className="text-center mt-10 text-red-400"><p>{error}</p></div>

  return (
    <div>
      <h1 className="text-3xl mb-4 font-bold">Últimos juegos</h1>
      {games.length === 0 ? (
        <p className="text-gray-400">No hay juegos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {games.map(g=> <GameCard key={g.id} game={g} />)}
        </div>
      )}
    </div>
  )
}

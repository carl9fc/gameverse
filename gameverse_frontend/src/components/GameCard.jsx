import { useNavigate } from 'react-router-dom'

export default function GameCard({ game }) {
  const navigate = useNavigate()

  return (
    <div 
      className="bg-gray-800 rounded overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition transform"
      onClick={() => navigate(`/games/${game.id}`)}
    >
      <div className="w-full h-48 bg-gray-700 overflow-hidden">
        {game.coverUrl ? (
          <img 
            src={game.coverUrl} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{game.title}</h3>
        <p className="text-sm text-gray-400">{game.genre} • {game.platform}</p>
        <button 
          className="mt-3 text-blue-400 hover:text-blue-300 text-sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/games/${game.id}`)
          }}
        >
          Ver
        </button>
      </div>
    </div>
  )
}
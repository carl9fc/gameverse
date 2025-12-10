import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 
            className="text-2xl font-bold text-blue-400 cursor-pointer"
            onClick={() => navigate('/')}
          >
            GameVerse
          </h1>
          <a 
            href="/games"
            className="text-gray-300 hover:text-white transition"
          >
            Juegos
          </a>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-300">
                <span className="font-semibold">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="ml-2 bg-red-600 px-2 py-1 rounded text-xs text-white">Admin</span>
                )}
                {user.role === 'usuario' && (
                  <span className="ml-2 bg-blue-600 px-2 py-1 rounded text-xs text-white">Usuario</span>
                )}
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Perfil
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
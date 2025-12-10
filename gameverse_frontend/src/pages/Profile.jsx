import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth.js'

export default function Profile(){
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if(!user) return (
    <div className="text-center mt-10">
      <p className="text-gray-400">Debes iniciar sesión para ver tu perfil</p>
    </div>
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <div className="bg-gray-800 p-6 rounded shadow-lg space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Usuario</p>
          <p className="text-xl font-semibold">{user.username || user.name}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-xl font-semibold">{user.email}</p>
        </div>
        <div className="pt-4 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

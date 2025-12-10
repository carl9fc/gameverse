import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api.js'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (payload) => {
    const data = payload?.data || payload
    const token = data?.token
    if (token) {
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    if (data?.user) {
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
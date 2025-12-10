import api from './api.js'
export const listGames = (params) => api.get('/games', { params })
export const getGame = (id) => api.get(`/games/${id}`)
export const createGame = (data) => api.post('/games', data)

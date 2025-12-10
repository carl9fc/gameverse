const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const listReviews = async (gameId) => {
  const res = await fetch(`${API_URL}/reviews/${gameId}`);
  if (!res.ok) throw new Error('Error loading reviews');
  return await res.json();
};

export const createReview = async (gameId, payload) => {
  const res = await fetch(`${API_URL}/reviews/${gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error creating review');
  }
  return await res.json();
};

export const deleteReview = async (reviewId) => {
  const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: { ...authHeaders() }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error deleting review');
  }
  return true;
};


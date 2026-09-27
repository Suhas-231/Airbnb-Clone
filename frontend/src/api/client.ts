/// <reference types="vite/client" />
import { Listing, NearbyStay, PhotoTourResponse, ReservationQuoteRequest, ReservationQuoteResponse, ReviewResponse } from '../types/listing';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8081/api';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    // If direct fails (e.g. CORS or proxy issue), try relative endpoint via Vite proxy
    try {
      const proxyRes = await fetch(`/api${endpoint}`);
      if (proxyRes.ok) {
        return (await proxyRes.json()) as T;
      }
    } catch {
      // ignore
    }
    throw err;
  }
}

export const api = {
  getListing: (id: string = 'mirashya-ug10'): Promise<Listing> => {
    return fetchFromApi<Listing>(`/listings/${id}`);
  },

  getPhotos: (id: string = 'mirashya-ug10'): Promise<PhotoTourResponse> => {
    return fetchFromApi<PhotoTourResponse>(`/listings/${id}/photos`);
  },

  getReviews: (id: string = 'mirashya-ug10'): Promise<ReviewResponse> => {
    return fetchFromApi<ReviewResponse>(`/listings/${id}/reviews`);
  },

  getNearbyStays: (): Promise<NearbyStay[]> => {
    return fetchFromApi<NearbyStay[]>(`/listings/nearby`);
  },

  getQuote: async (request: ReservationQuoteRequest): Promise<ReservationQuoteResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as ReservationQuoteResponse;
    } catch {
      const proxyRes = await fetch(`/api/reservations/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (proxyRes.ok) return (await proxyRes.json()) as ReservationQuoteResponse;
      throw new Error('Failed to get quote');
    }
  }
};

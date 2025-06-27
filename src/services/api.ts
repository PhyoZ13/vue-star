import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { API_CONFIG } from '@/constants'

export interface Game {
  id: string
  name: string
  image: string
  categories: string[]
}

export interface Jackpot {
  game: string
  amount: number
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiService {
  private axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  private handleError(error: AxiosError): never {
    if (error.response) {
      throw new ApiError(
        `Server error: ${error.response.status}`,
        error.response.status,
        error.code
      )
    } else if (error.request) {
      throw new ApiError(
        'Network error. Please check your connection.',
        undefined,
        'NETWORK_ERROR'
      )
    } else {
      throw new ApiError(
        error.message || 'An unexpected error occurred',
        undefined,
        'UNKNOWN_ERROR'
      )
    }
  }

  async fetchGames(): Promise<Game[]> {
    try {
      const response: AxiosResponse<Game[]> = await this.axiosInstance.get(
        API_CONFIG.ENDPOINTS.GAMES
      )
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError)
    }
  }

  async fetchJackpots(): Promise<Jackpot[]> {
    try {
      const response: AxiosResponse<Jackpot[]> = await this.axiosInstance.get(
        API_CONFIG.ENDPOINTS.JACKPOTS
      )
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError)
    }
  }

  async fetchGamesAndJackpots(): Promise<{ games: Game[]; jackpots: Jackpot[] }> {
    try {
      const [games, jackpots] = await Promise.all([
        this.fetchGames(),
        this.fetchJackpots()
      ])
      return { games, jackpots }
    } catch (error) {
      this.handleError(error as AxiosError)
    }
  }
}

export const apiService = new ApiService()
export default apiService 
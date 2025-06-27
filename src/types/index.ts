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
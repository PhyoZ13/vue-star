import { mount } from '@vue/test-utils'
import GameCard from '@/components/GameCard.vue'
import type { Game } from '@/types'

describe('GameCard', () => {
  const mockGame: Game = {
    id: 'test-game-1',
    name: 'Test Game',
    image: 'https://example.com/game.jpg',
    categories: ['new', 'slot']
  }

  it('renders game information correctly', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame
      }
    })

    expect(wrapper.find('.game-title').text()).toBe('Test Game')
    expect(wrapper.find('.game-category').text()).toBe('New, Slot')
    expect(wrapper.find('.game-image').attributes('src')).toBe('https://example.com/game.jpg')
    expect(wrapper.find('.game-image').attributes('alt')).toBe('Test Game')
  })

  it('displays jackpot overlay when provided', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: 1000000
      }
    })

    expect(wrapper.find('.jackpot-overlay').exists()).toBe(true)
    expect(wrapper.find('.jackpot-overlay').text()).toBe('€1.0M')
  })

  it('does not display jackpot overlay when not provided', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame
      }
    })

    expect(wrapper.find('.jackpot-overlay').exists()).toBe(false)
  })

  it('shows NEW ribbon when game is in new category', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        currentCategory: 'new'
      }
    })

    expect(wrapper.find('.ribbon-new').exists()).toBe(true)
    expect(wrapper.find('.ribbon-new').text()).toBe('NEW')
  })

  it('shows TOP ribbon when game is in top category', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        currentCategory: 'top'
      }
    })

    expect(wrapper.find('.ribbon-top').exists()).toBe(true)
    expect(wrapper.find('.ribbon-top').text()).toBe('TOP')
  })

  it('shows NEW ribbon when game has new category', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: { ...mockGame, categories: ['new', 'slot'] }
      }
    })

    expect(wrapper.find('.ribbon-new').exists()).toBe(true)
  })

  it('shows TOP ribbon when game has top category', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: { ...mockGame, categories: ['top', 'slot'] }
      }
    })

    expect(wrapper.find('.ribbon-top').exists()).toBe(true)
  })

  it('does not show ribbons when not applicable', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: { ...mockGame, categories: ['slot'] },
        currentCategory: 'slot'
      }
    })

    expect(wrapper.find('.ribbon-new').exists()).toBe(false)
    expect(wrapper.find('.ribbon-top').exists()).toBe(false)
  })

  it('displays hover overlay with play button and game name', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame
      }
    })

    const hoverOverlay = wrapper.find('.hover-overlay')
    expect(hoverOverlay.exists()).toBe(true)
    expect(hoverOverlay.find('.play-button').exists()).toBe(true)
    expect(hoverOverlay.find('.play-icon').exists()).toBe(true)
    expect(hoverOverlay.find('.game-name').exists()).toBe(true)
    expect(hoverOverlay.find('.game-name').text()).toBe('Test Game')
  })

  it('formats jackpot amounts correctly', async () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: 2500000
      }
    })

    expect(wrapper.find('.jackpot-overlay').text()).toBe('€2.5M')

    await wrapper.setProps({ 
      jackpotAmount: 15000 
    })
    expect(wrapper.find('.jackpot-overlay').text()).toBe('€15.0K')

    await wrapper.setProps({ 
      jackpotAmount: 500 
    })
    expect(wrapper.find('.jackpot-overlay').text()).toBe('€500')
  })

  it('applies has-jackpot class when jackpot exists', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: 1000000
      }
    })

    expect(wrapper.classes()).toContain('has-jackpot')
  })

  it('removes has-jackpot class when no jackpot', async () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: 1000000
      }
    })

    expect(wrapper.classes()).toContain('has-jackpot')

    await wrapper.setProps({ jackpotAmount: null })
    expect(wrapper.classes()).not.toContain('has-jackpot')
  })

  it('handles empty jackpot amount', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: 0
      }
    })

    expect(wrapper.find('.jackpot-overlay').exists()).toBe(false)
  })

  it('handles null jackpot amount', () => {
    const wrapper = mount(GameCard, {
      props: {
        game: mockGame,
        jackpotAmount: null
      }
    })

    expect(wrapper.find('.jackpot-overlay').exists()).toBe(false)
  })
}) 
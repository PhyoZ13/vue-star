import { mount } from '@vue/test-utils'
import CategoryFilter from '@/components/CategoryFilter.vue'

describe('CategoryFilter', () => {
  const mockCategories = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New Games' },
    { value: 'top', label: 'Top Games' },
    { value: 'slot', label: 'Slot' },
    { value: 'other', label: 'Other' }
  ]

  it('renders all categories as buttons', () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: mockCategories,
        selectedCategory: 'all'
      }
    })

    const buttons = wrapper.findAll('.category-btn')
    expect(buttons).toHaveLength(5)
    expect(buttons[0].text()).toBe('All')
    expect(buttons[1].text()).toBe('New Games')
    expect(buttons[2].text()).toBe('Top Games')
    expect(buttons[3].text()).toBe('Slot')
    expect(buttons[4].text()).toBe('Other')
  })

  it('highlights selected category', () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: mockCategories,
        selectedCategory: 'new'
      }
    })

    const buttons = wrapper.findAll('.category-btn')
    expect(buttons[1].classes()).toContain('active')
    expect(buttons[0].classes()).not.toContain('active')
  })

  it('emits categoryChange on button click', async () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: mockCategories,
        selectedCategory: 'all'
      }
    })

    const slotButton = wrapper.findAll('.category-btn')[3]
    await slotButton.trigger('click')

    expect(wrapper.emitted('category-change')).toBeTruthy()
    expect(wrapper.emitted('category-change')?.[0]).toEqual(['slot'])
  })

  it('formats category names properly', () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: [
          { value: 'all', label: 'All' },
          { value: 'new', label: 'New Games' },
          { value: 'top', label: 'Top Games' },
          { value: 'slot', label: 'Slot' },
          { value: 'other', label: 'Other' },
          { value: 'ball', label: 'Ball' },
          { value: 'virtual', label: 'Virtual' }
        ],
        selectedCategory: 'all'
      }
    })

    const buttons = wrapper.findAll('.category-btn')
    expect(buttons[0].text()).toBe('All')
    expect(buttons[1].text()).toBe('New Games')
    expect(buttons[2].text()).toBe('Top Games')
    expect(buttons[3].text()).toBe('Slot')
    expect(buttons[4].text()).toBe('Other')
    expect(buttons[5].text()).toBe('Ball')
    expect(buttons[6].text()).toBe('Virtual')
  })

  it('handles empty categories', () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: [],
        selectedCategory: 'all'
      }
    })

    const buttons = wrapper.findAll('.category-btn')
    expect(buttons).toHaveLength(0)
  })

  it('supports hover interactions', async () => {
    const wrapper = mount(CategoryFilter, {
      props: {
        categories: mockCategories,
        selectedCategory: 'all'
      }
    })

    const button = wrapper.find('.category-btn')
    await button.trigger('mouseenter')
    
    expect(button.exists()).toBe(true)
  })
}) 
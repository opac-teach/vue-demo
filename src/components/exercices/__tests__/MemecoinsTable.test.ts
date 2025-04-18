import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MemecoinsTable from '@/components/exercices/MemecoinsTable.vue'
import { useMemecoinsStore } from '@/stores/memecoins'

describe('MemecoinsTable', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('displays loading state', () => {
    const wrapper = mount(MemecoinsTable, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              memecoins: { loading: true, memecoins: [], error: '' }
            }
          })
        ]
      }
    })

    expect(wrapper.text()).toContain('Chargement...')
  })

  it('displays error message', () => {
    const wrapper = mount(MemecoinsTable, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              memecoins: { loading: false, memecoins: [], error: 'Failed to load' }
            }
          })
        ]
      }
    })

    expect(wrapper.text()).toContain('Failed to load')
  })

  it('displays memecoins table', () => {
    const mockMemecoins = [
      { id: '1', name: 'Test Coin', symbol: 'TEST', description: 'Test description', createdAt: '2023-01-01' }
    ]

    const wrapper = mount(MemecoinsTable, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              memecoins: { loading: false, memecoins: mockMemecoins, error: '' }
            }
          })
        ]
      }
    })

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Coin')
    expect(wrapper.text()).toContain('TEST')
    expect(wrapper.text()).toContain('Test description')
  })

  it('calls fetchMemecoins on mount', () => {
    const wrapper = mount(MemecoinsTable, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const store = useMemecoinsStore()
    expect(store.fetchMemecoins).toHaveBeenCalled()
  })
})

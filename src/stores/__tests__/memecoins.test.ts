import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMemecoinsStore } from '../memecoins'
import * as api from '@/services/api'

vi.mock('@/services/api', () => ({
  getMemecoins: vi.fn(),
  createMemecoin: vi.fn()
}))

describe('Memecoins Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('fetches memecoins successfully', async () => {
    const mockMemecoins = [{ id: '1', name: 'Test Coin', symbol: 'TEST' }]
    vi.mocked(api.getMemecoins).mockResolvedValue(mockMemecoins)

    const store = useMemecoinsStore()
    await store.fetchMemecoins()

    expect(store.memecoins).toEqual(mockMemecoins)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('')
  })

  it('handles fetch error', async () => {
    vi.mocked(api.getMemecoins).mockRejectedValue(new Error('API error'))

    const store = useMemecoinsStore()
    await store.fetchMemecoins()

    expect(store.error).toBe('Failed to load memecoins')
    expect(store.loading).toBe(false)
  })

  it('creates memecoin successfully', async () => {
    vi.mocked(api.createMemecoin).mockResolvedValue({ success: true })
    vi.mocked(api.getMemecoins).mockResolvedValue([])

    const store = useMemecoinsStore()
    const result = await store.createMemecoin({ name: 'New Coin', symbol: 'NEW' })

    expect(result).toBe(true)
    expect(api.createMemecoin).toHaveBeenCalledWith({ name: 'New Coin', symbol: 'NEW' })
    expect(api.getMemecoins).toHaveBeenCalled()
  })
})

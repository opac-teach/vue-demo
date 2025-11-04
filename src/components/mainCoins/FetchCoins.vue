<script lang="ts">
import { onUnmounted, ref } from 'vue'
import { useJwt } from '@/stores/jwt.ts'
const jwt = useJwt()

export const useFetch = (url: string, poll = false) => {
  const isLoading = ref(true)
  const error = ref<null | Error>(null)
  const data = ref<null | any>(null)

  const getData = () => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status.toString())
        }
      })
      .then((d) => {
        data.value = d
        isLoading.value = false
        error.value = null
      })
      .catch((e) => {
        console.log(e)
        data.value = null
        isLoading.value = false
        error.value = e.message
      })
  }

  let interval = null
  getData()

  if (poll) {
    interval = setInterval(() => {
      getData()
    }, 2000)
  }

  onUnmounted(() => {
    interval && clearInterval(interval)
  })

  return {
    isLoading,
    data,
    error,
  }
}

type NewCoin = {
  name: string
  symbol: string
  description?: string
  logoUrl?: string
}

export const PushCoin = async (event: Event): Promise<any> => {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  const newCoin: NewCoin = {
    name: formData.get('name') as string,
    symbol: formData.get('symbol') as string,
    description: (formData.get('description') as string) || '',
    logoUrl: (formData.get('logoUrl') as string) || '',
  }

  const createCoinUrl = 'https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected'

  try {
    const response = await fetch(createCoinUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.jwt?.token}`,
      },
      body: JSON.stringify(newCoin),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Coin added:', data)
    form.reset()
    return data
  } catch (error) {
    console.error('Error adding coin:', error)
    throw error
  }
}
</script>

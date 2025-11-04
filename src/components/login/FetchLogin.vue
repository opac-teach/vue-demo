<script lang="ts">
import { useJwt } from '@/stores/jwt.ts'
const jwt = useJwt()

export const FetchLogin = async (event: Event): Promise<any> => {
  const loginURL = 'https://nuxt-demo-blush.vercel.app/api/login'
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: formData.get('password') }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Login successful:', data)
    jwt.jwt = { token: data.token, userId: data.userId }
    return data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}
</script>

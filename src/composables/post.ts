import { ref } from 'vue'

export const usePost = () => {
  const error = ref(false)
  const json = ref({})

  function post(url, body) {
    try {
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      })

      json.value = response.json()
    } catch {
      error.value = true
    }

    return {
      error,
      json,
    }
  }

  return {
    post,
  }
}

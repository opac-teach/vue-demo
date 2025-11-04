import { onUnmounted, ref } from 'vue'

export const useFetch = <T = unknown>(url: string, poll = false) => {
  const isLoading = ref(true)
  const error = ref<null | string>(null)
  const data = ref<null | T>(null)

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

  let interval: number | null = null
  getData()

  if (poll) {
    interval = window.setInterval(() => {
      getData()
    }, 2000)
  }

  onUnmounted(() => {
    if (interval !== null) {
      clearInterval(interval)
    }
  })

  return {
    isLoading,
    data,
    error,
    refresh: getData,
  }
}

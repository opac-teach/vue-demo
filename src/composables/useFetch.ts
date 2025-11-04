import { onUnmounted, ref } from 'vue'

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

  let interval = null as any
  getData()

  if (poll) {
    interval = setInterval(() => {
      getData()
    }, 3000)
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



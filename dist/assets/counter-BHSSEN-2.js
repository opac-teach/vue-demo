const n=`import { ref } from 'vue'

export const useCount = () => {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  return {
    count,
    increment,
  }
}
`,o=`import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
`;export{n as C,o as a};

import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state: () => ({
    item: {
      id: null,
      name: '',
      meta: {}
    }
  }),
  actions: {
    setItem(obj: any) {
      this.item = obj
    },
  }
})
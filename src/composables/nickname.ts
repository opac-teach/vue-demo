import { defineStore } from "pinia";
import { ref } from "vue";

export const useNickname = defineStore("nickname", () => {
  const nickname = ref<string>("")

  return { nickname };
});
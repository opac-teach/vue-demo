import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const loggedIn = ref(false);
  const error = ref(false);
  const jwt = ref("");
  const id = ref("");

  async function login(form) {
    try {
      const response = await fetch("https://nuxt-demo-blush.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        error.value = true;
        return
      }

      const json = await response.json();
      jwt.value = json.token;
      id.value = json.id;
      loggedIn.value = true;
      // console.log(loggedIn.value);
      console.log("logged in")

    } catch (error) {
      error.value = true;
      console.error(error)
    }

  }

  function logout() {
    loggedIn.value = false;
    jwt.value = "";
    id.value = "";
  }

  return {
    login,
    logout,
    loggedIn,
    id,
    jwt,
    error,
  }
})

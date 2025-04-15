import { ref } from 'vue';
import { defineStore } from 'pinia'

interface UserNOTWORKING {
  id: number,
  username: string,
}

export const useUser = defineStore("user", () => {
    const users = ref<UserNOTWORKING[]>([])
    const loading = ref(true);
    const token = ref('')

    async function getUsers() {
      try{
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok){
          return
        }
        const json = await response.json();
        users.value = json
        loading.value = false
      } catch (error) {
        console.error(error.message)
        loading.value = false

      }
    }

    async function login(form) {
      try {

        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: form
        });

        if (!response.ok){
          return
        }
        const json = await response.json();
        token.value = json.token;

      } catch{


      }
    }

    return {
      users,
      loading,
      getUsers,
      login,
      token,
    }
  }
)

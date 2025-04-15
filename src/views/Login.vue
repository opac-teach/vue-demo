<template>

  <h1>Login</h1>
  <form @submit.prevent="login">

    <input class=input v-model="form.password" />

    <button class="btn" type="submit">Login</button>
  </form>

</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue'
  import { useUser } from "@/stores/user"

  const userStore = useUser()


  interface Login {
    password: string,
  }
  const form = reactive<Login>({
    password: null
  })

  // onMounted(async() => {
  //   await userStore.getUsers()
  // })

  function login() {
    console.log(form)
    userStore.login(form)
  }

</script>

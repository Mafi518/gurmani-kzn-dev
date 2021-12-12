<template>
  <div>
    <h1>WELCOME</h1>

    <form action="">
      <input type="file" name="" id="discount-image" />
      <button type="submit">Загрузить фото</button>
    </form>

    <button @click="signOutUser" >logout</button>
  </div>
</template>
<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '@/firebase'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      image: "",
    };
  },
  setup() {
    const { user } = useAuthState()
    const auth = getAuth()

    const router = useRouter()
    const signOutUser = async () => {
      try {
        await signOut(auth)
        router.push('/auth')
      } catch (error) {
        console.log(error);
      }
    }


    return { user, signOutUser }
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
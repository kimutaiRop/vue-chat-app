<template>
  <div>
    <button v-if="rem_seconds < 30000" @click="refreshToken">
      refresh token
    </button>
    token expires in {{ parseInt(rem_seconds / 1000) }} sec
    <HomeComponent/>
  </div>

</template>
<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {
    HomeComponent,
  },
  computed: {
    ...mapGetters(["user", "profile", "rem_seconds"]),
  },
  methods: {
    refreshToken() {
      this.$store.commit("refreshToken");
    },
  },
};
</script>

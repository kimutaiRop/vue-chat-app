<template>
  <HomeComponent/>
</template>
<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'
import { mapGetters } from "vuex";

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

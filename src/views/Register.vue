<template>
  <div>
    <RegisterComp @handle-register="registerHandler" />
  </div>
</template>
<script>
import RegisterComp from "@/components/RegisterComp.vue";

export default {
  name: "Register",
  components: {
    RegisterComp,
  },

  methods: {
    registerHandler(data) {
      this.$store.commit("register", data);
    },
  },
};
</script>


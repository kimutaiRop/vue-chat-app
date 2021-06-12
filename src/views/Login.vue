<template>
  <div>
    <LoginComp @login-handler="loginHandler" />
  </div>
</template>

<script>
import LoginComp from "../components/LoginComp";

export default {
  name: "Login",
  components: {
    LoginComp,
  },

  methods: {
    loginHandler(data) {
      data["next_url"] = this.$route.params.nextUrl
        ? this.$route.params.nextUrl
        : "/";
      this.$store.commit("login", data);
    },
  },
};
</script>
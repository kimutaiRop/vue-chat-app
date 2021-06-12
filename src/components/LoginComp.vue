<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Welcome Back !</h5>
            <p class="text-muted">Sign in to continue</p>
            <small
              class="text-danger"
              v-for="err of login_errors"
              :key="err.code"
            >
              {{ err.message }}
            </small>
          </div>
          <div class="p-2 mt-4">
            <form @submit="handleLogin">
              <div class="mb-3">
                <label class="form-label" for="username">Username</label>
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="Enter username"
                  name="email"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="userpassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="userpassword"
                  placeholder="Enter password"
                />
              </div>

              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="auth-remember-check"
                />
                <label class="form-check-label" for="auth-remember-check"
                  >Remember me</label
                >
              </div>

              <div class="mt-3 text-end">
                <button
                  class="btn btn-primary w-sm waves-effect waves-light"
                  type="submit"
                >
                  Log In
                </button>
              </div>
              <SocialAuth />
              <div class="mt-4 text-center">
                <p class="mb-0">
                  Don't have an account ?
                  <router-link
                    :to="{ name: 'Register' }"
                    class="fw-medium text-primary"
                  >
                    Signup now
                  </router-link>
                  or
                  <router-link
                    :to="{ name: 'ForgotPassword' }"
                    class="fw-medium text-primary"
                  >
                    forgot password</router-link
                  >
                  or
                  <router-link
                    :to="{ name: 'ResendActivationEmail' }"
                    class="fw-medium text-primary"
                  >
                    resend
                  </router-link>
                  verification instructions
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import SocialAuth from "./SocialAuth";
export default {
  name: "LoginComp",
  components: {
    SocialAuth,
  },
  computed: {
    ...mapGetters(["login_errors", "login_success"]),
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      let data = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };
      this.$emit("login-handler", data);
    },
  },
};
</script>
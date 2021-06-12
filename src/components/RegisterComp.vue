<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Register Account</h5>
            <p class="text-muted">Get your free</p>
            <div
              v-if="register_success"
              class="alert alert-success text-center mb-4"
              role="alert"
            >
              account has been created please check you email to activate
              account
            </div>
          </div>
          <div class="p-2 mt-4">
            <form @submit="handleRegister">
              <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input
                  required
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                />
                <div v-for="(value, name) in register_errors" :key="name">
                  <div v-if="name === 'email'">
                    <small
                      class="text-danger"
                      v-for="err in value"
                      :key="err.code"
                    >
                      {{ err.message }} ⬆
                    </small>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="username">Username</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter username"
                  name="username"
                />
                <div v-for="(value, name) in register_errors" :key="name">
                  <div v-if="name === 'username'">
                    <small
                      class="text-danger"
                      v-for="err in value"
                      :key="err.code"
                    >
                      {{ err.message }} ⬆
                    </small>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label" for="userpassword">Password</label>
                <input
                  required
                  type="password"
                  class="form-control"
                  id="userpassword"
                  placeholder="Enter password"
                  name="password1"
                />
                <div v-for="(value, name) in register_errors" :key="name">
                  <div v-if="name === 'password1'">
                    <small
                      class="text-danger"
                      v-for="err in value"
                      :key="err.code"
                    >
                      {{ err.message }} ⬆ <br />
                    </small>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="userpassword"
                  >confirm password</label
                >
                <input
                  required
                  type="password"
                  class="form-control"
                  id="userpassword"
                  placeholder="Enter password"
                  name="password2"
                />
                <div v-for="(value, name) in register_errors" :key="name">
                  <div v-if="name === 'password2'">
                    <small
                      class="text-danger"
                      v-for="err in value"
                      :key="err.code"
                    >
                      {{ err.message }} ⬆ <br />
                    </small>
                  </div>
                </div>
              </div>

              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="auth-terms-condition-check"
                  required
                />
                <label class="form-check-label" for="auth-terms-condition-check"
                  >I accept
                  <a href="javascript: void(0);" class="text-dark"
                    >Terms and Conditions</a
                  ></label
                >
              </div>

              <div class="mt-3 text-end">
                <button
                  class="btn btn-primary w-sm waves-effect waves-light"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <SocialAuth />
              <div class="mt-4 text-center">
                <p class="text-muted mb-0">
                  Already have an account ?
                  <router-link
                    :to="{ name: 'Login' }"
                    class="fw-medium text-primary"
                  >
                    Login</router-link
                  >
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
  name: "RegisterComp",
  components: {
    SocialAuth,
  },
  computed: {
    ...mapGetters(["register_errors", "register_success"]),
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      let data = {
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        password1: e.target.elements.password1.value,
        password2: e.target.elements.password2.value,
      };
      this.$emit("handle-register", data);
    },
  },
};
</script>


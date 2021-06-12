<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">Reset your password</h5>
            <p class="text-muted">create new password for your account.</p>
            <div
              v-if="success"
              class="alert alert-success text-center mb-4"
              role="alert"
            >
              password has been reset you can login now with the new password
            </div>
            <small class="text-danger" v-for="err of errors" :key="err.code">
              {{ err.message }}
            </small>
          </div>

          <div class="p-2 mt-4">
            <form @submit="handleSet">
              <div class="mb-3">
                <label class="form-label" for="userpassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="userpassword"
                  placeholder="Enter password"
                  name="password1"
                />
                <div v-for="(value, name) in errors" :key="name">
                  <div v-if="name === 'newPassword1'">
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
                  type="password"
                  class="form-control"
                  id="userpassword"
                  placeholder="Enter password"
                  name="password2"
                />
                <div v-for="(value, name) in errors" :key="name">
                  <div v-if="name === 'newPassword2'">
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
              <div class="mt-4 text-center">
                <p class="text-muted mb-0">
                  Password set ?
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
export default {
  name: "NewPasswordComp",
  methods: {
    handleSet(e) {
      e.preventDefault();
      let data = {
        newPassword1: e.target.elements.password1.value,
        newPassword2: e.target.elements.password2.value,
      };
      this.$emit("handle-setpassword", data);
    },
  },
  props: {
    errors: Object,
    success: Boolean,
  },
};
</script>


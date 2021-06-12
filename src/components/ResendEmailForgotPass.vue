<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-primary">{{ heading }}</h5>
            <p class="text-muted">{{ sub_heading }}</p>
          </div>
          <div class="p-2 mt-4">
            <div
              v-if="success"
              class="alert alert-success text-center mb-4"
              role="alert"
            >
              {{ success_message }}
            </div>
            <div
              v-for="error in errors"
              class="alert alert-warning text-center mb-4"
              role="alert"
              :key="error.code"
            >
              {{ error.message }}
            </div>
            <form @submit="handleSubmit">
              <div class="mb-3">
                <label class="form-label" for="useremail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  placeholder="Enter email"
                  name="email"
                />
              </div>

              <div class="mt-3 text-end">
                <button
                  class="btn btn-primary w-sm waves-effect waves-light"
                  type="submit"
                >
                  Reset
                </button>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Remember It ?
                  <router-link
                    :to="{ name: 'Login' }"
                    class="fw-medium text-primary"
                  >
                    Signin
                  </router-link>
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
  name: "ResendEmailForgotPass",
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let data = {
        email: e.target.elements.email.value,
      };
      this.$emit("handle-submit", data);
    },
  },
  props: {
    errors: Array,
    success: Boolean,
    heading: String,
    sub_heading: String,
    success_message: String,
  },
};
</script>
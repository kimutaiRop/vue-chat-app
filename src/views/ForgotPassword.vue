<template>
  <ResendEmailForgotPass
    :errors="errors"
    :success="success"
    @handle-submit="requestToken"
    heading="Reset Password"
    sub_heading="Rescue your account"
    success_message="password reset instructions have been sent to your email"
  />
</template>
<script>
import gql from "graphql-tag";
import ResendEmailForgotPass from "../components/ResendEmailForgotPass";
export default {
  name: "ForgotPassword",
  components: {
    ResendEmailForgotPass,
  },
  data() {
    return {
      errors: [],
      success: false,
    };
  },
  methods: {
    requestToken(data_) {
      let RESET_QUERY = gql`
        mutation($email: String!) {
          sendPasswordResetEmail(email: $email) {
            success
            errors
          }
        }
      `;
      this.$apollo.mutate({
        mutation: RESET_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          try {
            let errors = data.sendPasswordResetEmail.errors;
            this.success = data.sendPasswordResetEmail.success;
            if (errors) {
              this.errors = errors.email;
            }
          } catch (e) {
            console.log(e);
          }
        },
      });
    },
  },
};
</script>
<template>
  <NewPasswordComp
    :success="success"
    :errors="errors"
    @handle-setpassword="SetNewPass"
  />
</template>
<script>
import gql from "graphql-tag";
import NewPasswordComp from "../components/NewPassword";
export default {
  name: "NewPassword",
  components: {
    NewPasswordComp,
  },
  data() {
    return {
      errors: {},
      success: false,
    };
  },
  methods: {
    SetNewPass(data_) {
      let PASSWORD_QUERY = gql`
        mutation(
          $newPassword1: String!
          $newPassword2: String!
          $token: String!
        ) {
          passwordReset(
            token: $token
            newPassword1: $newPassword1
            newPassword2: $newPassword2
          ) {
            errors
            success
          }
        }
      `;
      this.success = false;
      this.errors = {};
      data_.token = this.$route.params.token;
      this.$apollo.mutate({
        mutation: PASSWORD_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          try {
            let errors = data.passwordReset.errors;
            this.success = data.passwordReset.success;
            if (errors) {
              this.errors = errors;
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
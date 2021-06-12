<template>
  <div>
    <ul>
      <li
        style="list-style: none"
        class="alert alert-warning"
        :key="error.code"
        v-for="error in nonField"
      >
        {{ error.message }}
      </li>
    </ul>
    <ul>
      <div v-if="success">
        <li class="alert alert-success" style="list-style: none">
          your account has been verified, login now?
        </li>
      </div>
      <router-link :to="{ name: 'Login' }"> Login</router-link>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";

let ACTIVATE_ACCOUNT = gql`
  mutation activteUser($token: String!) {
    verifyAccount(token: $token) {
      errors
      success
    }
  }
`;
export default {
  name: "Activate",
  data() {
    return {
      nonField: [],
      success: false,
      errors: false,
    };
  },
  created() {
    let token = this.$route.params.token;
    this.$apollo.mutate({
      mutation: ACTIVATE_ACCOUNT,
      variables: { token: token },
      update: (cache, { data }) => {
        try {
          let errors = data.verifyAccount.errors;
          this.success = data.verifyAccount.success;
          if (errors) {
            this.errors = true;
            this.nonField = errors.nonFieldErrors ? errors.nonFieldErrors : [];
          }
        } catch (e) {
          console.log(e);
        }
      },
    });
  },
};
</script>
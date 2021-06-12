<template>
  <div
    class="modal fade show"
    id="session-timeout-dialog"
    style="display: block"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
            data-bs-dismiss="modal"
          >
            ×
          </button>
          <h4 class="modal-title">
            {{ user.username }} your session is about to expire!
          </h4>
        </div>
        <div class="modal-body">
          <p>
            you can now either logout or renew connection to stay connected.
            please always remember to end your connection to stay safe
          </p>
          <p>
            Ending in
            <span class="countdown-holder"
              >{{ parseInt(rem_seconds / 1000) }}s</span
            >
            seconds.
          </p>
        </div>
        <div class="modal-footer">
          <button
            id="session-timeout-dialog-logout"
            type="button"
            class="btn btn-default"
            @click="$store.commit('logout')"
          >
            Logout
          </button>
          <button
            id="session-timeout-dialog-keepalive"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            data-bs-dismiss="modal"
            @click="refreshToken"
          >
            Stay Connected
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SessionTimeout",
  computed: {
    ...mapGetters(["user", "profile", "rem_seconds"]),
  },
  methods: {
    refreshToken() {
      this.$store.commit("refreshSessionToken");
    },
  },
};
</script>
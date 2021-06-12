<template>
  <div id="frame">
    <SidePanel  @change-chat="changeChat" />
    <div class="content">
      <div class="contact-profile">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
        <p>
          <span v-for="part in getPrticipants()" :key="part.id">
            <span v-if="parseInt(part.id) !== user.pk">
              {{ part.username }}
            </span> {{ "  "}}
          </span>
        </p>
        <div class="social-media">
          <i class="fa fa-facebook" aria-hidden="true"></i>
          <i class="fa fa-twitter" aria-hidden="true"></i>
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </div>
      </div>
      <div class="messages">
        <ul>
          <li :class="parseInt(message.node.sender.id) === user.pk ? 'sent' : 'replies'"  v-for="message in messages(current_chat.id)"
            :key="message.node.id">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>
               {{ message.node.text }}<br>
                <small style="font-size:10px">{{new Date(message.node.created).toLocaleString()}}</small>
            </p>
          </li>
        </ul>
      </div>
      <div class="message-input">
        <form class="wrap"  @submit="sendMessage">
          <input name="message" required  type="text" placeholder="Write your message..." />
          <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button class="submit">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import SidePanel from "./SidePanel";
import { mapGetters } from "vuex";

export default {
  name: "HomeComponent",
  components: { SidePanel },
  data(){
      return{current_chat:{}}
  },
  computed: {
    ...mapGetters(["messages", "user"]),
  },
  methods: {
    changeChat(chat) {
      this.$store.commit("fetchMessages", chat.id);
      this.current_chat = chat;
    },
    sendMessage(e){
      e.preventDefault();
      let message = e.target.elements.message.value
      this.$store.commit("sendMessage", {
          chatId:this.current_chat.id,
          message:message});
    },
    getPrticipants() {
        let participants = this.current_chat.participants;
        if (participants) {
            return participants;
        } else {
            return [{ username: "please select user to chat with here" }];
        }
    },
  }
};
</script>

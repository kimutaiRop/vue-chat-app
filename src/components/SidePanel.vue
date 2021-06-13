<template>
  <div id="sidepanel">
    <div id="profile">
      <div class="wrap">
        <img
          id="profile-img"
          src="http://emilcarlsson.se/assets/mikeross.png"
          class="online"
          alt=""
        />
        <p>Mike Ross</p>
        <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
        <div id="status-options">
          <ul>
            <li id="status-online" class="active">
              <span class="status-circle"></span>
              <p>Online</p>
            </li>
            <li id="status-away">
              <span class="status-circle"></span>
              <p>Away</p>
            </li>
            <li id="status-busy">
              <span class="status-circle"></span>
              <p>Busy</p>
            </li>
            <li id="status-offline">
              <span class="status-circle"></span>
              <p>Offline</p>
            </li>
          </ul>
        </div>
        <div id="expanded">
          <label for="twitter"
            ><i class="fa fa-facebook fa-fw" aria-hidden="true"></i
          ></label>
          <input name="twitter" type="text" value="mikeross" />
          <label for="twitter"
            ><i class="fa fa-twitter fa-fw" aria-hidden="true"></i
          ></label>
          <input name="twitter" type="text" value="ross81" />
          <label for="twitter"
            ><i class="fa fa-instagram fa-fw" aria-hidden="true"></i
          ></label>
          <input name="twitter" type="text" value="mike.ross" />
        </div>
      </div>
    </div>
    <div id="search">
      <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
      <input type="text" placeholder="Search contacts..." />
    </div>
    <div id="contacts">
      <ul>
        <li class="contact" v-for="chat in chats" :key="chat.node.id">
          <div class="wrap"  @click="changeChat(getChat(chat))">
            <span class="contact-status online"></span>
            <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
            <div class="meta">
              <p class="name" v-if="chat.node.group">{{chat.node.name}} </p>
              <p class="name" v-else>{{getUser(chat)}}</p>
              <p class="preview">{{lastMessage(chat)}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="bottom-bar">
      <button id="addcontact">
        <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
        <span>Add contact</span>
      </button>
      <button id="settings">
        <i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SidePanel",
  computed: {
    ...mapGetters(["chats", "user"]),
  },
  methods: {
      getUser(chat){
        let participants = chat.node.participants
        let user = participants.filter(e => parseInt(e.id) !== this.user.pk )
        return user[0].username
    },
    changeChat(chat){
      this.$emit("change-chat",chat)
    },
    getChat(chat){
      return chat.node
    },
    lastMessage(chat){
      let messages = chat.node.messages.edges
      if(messages.length){
          return messages[0].node.text
      }
      
    }
  }
};
</script>

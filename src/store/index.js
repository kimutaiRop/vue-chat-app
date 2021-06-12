import Vue from 'vue'
import Vuex from 'vuex'
import { client } from '../apollo_client'
import gql from "graphql-tag";
import router from '../router'
import * as _ from 'underscore'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    token: "",
    user: {},
    profile: {},
    login_errors: [],
    register_errors: {},
    login_success: false,
    register_success: false,
    rem_seconds: 0,
    intervalObj: null,
    chats:[],
    messages:{}
  },

  mutations: {
    LogoutTimer(state, exp) {
      state.intervalObj = setInterval(() => {
        exp = new Date(localStorage.getItem("expiry"))
        let rem = exp - new Date()
        if (rem > 0) {
          state.rem_seconds = rem
        } else {
          clearInterval(state.intervalObj);
        }
      }, 1000);
    },
    logout(state) {
      clearInterval(state.intervalObj);
      localStorage.removeItem("token")
      localStorage.removeItem("expiry")
      sessionStorage.removeItem("refresh_token")
      state.rem_seconds = 0
      let path = _.findWhere(router.options.routes, { name: router.history.current.name })
      if (path.meta.requiresAuth) {
        router.push({ name: 'Login' })
      }
      state.user = {}
      state.profile = {}
    },
    sendMessage(state, data_) {
      let CREATE_QUERY = gql`mutation($chatId:Int!,$message:String!){
        sendMessage(chatId:$chatId,message:$message){
          message{
            id
            text
            created
            read
            sender {
                id
              }
          }
        }
      }`
      let all_messages = { ...state.messages }
      let my_saved_messages = all_messages[data_.chatId]
      client.mutate({
        mutation: CREATE_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          let message = data.sendMessage.message
          my_saved_messages.push({ "node": message })
          all_messages[data_.chatId] = my_saved_messages
          state.messages = all_messages
        }
      });
    },
    fetchMessages(state, id) {
      let MESSAGES_QUERY = gql`query($id: ID,$last: Int){
        messages(id:$id, last:$last) {
          edges {
            node {
              id
              text
              created
              read
              sender {
                id
              }
            }
          }
        }
      }`;
      let stored_messages = { ...state.messages }
      if (stored_messages[id]) {
        console.log("messages found")
      } else {
        console.log("fetching...")
        client.query({
          query: MESSAGES_QUERY,
          variables: { id: id, last: 10 }
        }).then(res => {
          let messages = res.data.messages.edges
          stored_messages[id] = messages
          state.messages = stored_messages
        })
      }
    },
    messageSubscription(state){
      let SUBSCRIBE_MESSAGES = gql`subscription($username: String) {
        onNewMessage(chatroom: $username) {
          message {
            chatSet {
              edges {
                node {
                  id
                }
              }
            }
            sender{
              id
            }
            id
            text
            created
            read
          }
        }
      }`;
      let that = this
      client.subscribe({
        query: SUBSCRIBE_MESSAGES,
        variables: { username: state.user.username }
      }).subscribe({
        next(res) {
          let data = res.data.onNewMessage.message
          console.log(data.chatSet.edges[0].node)
          let id = data.chatSet.edges[0].node.id
          let all_messages = { ...state.messages }
          if (!all_messages[id]) {
            that.commit("fetchMessages", id)
          } else {
            let my_saved_messages = all_messages[id]
            let msg = { "node": data }
            console.log(msg)
            my_saved_messages.push(msg)
            all_messages[id] = my_saved_messages
            state.messages = all_messages
          }

        }
      })
    },
    AuthVerified(state) {
      let USER_QUERY = gql`query{
        me {
          id
          username
          email
          lastName
          lastLogin
          firstName
          verified
          pk
        }
        chats(last:10) {
          edges {
            node {
              id
              name
              lastModified
              participants {
                id
                username
                email
              }
              messages(last:1) {
                edges {
                  node {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }`
      client.query({
        query: USER_QUERY,
        variables: {}
      }).then(res => {
        let data = res.data
        state.user = data.me
        state.chats = data.chats.edges
        this.commit("messageSubscription")
      })
    },
    checkAuth(state) {
      let token = localStorage.getItem("token")
      let expiry = localStorage.getItem("expiry")
      let now_ = new Date()
      let exp_time = new Date(expiry)
      if (exp_time > now_) {
        clearInterval(state.intervalObj);
        this.commit("LogoutTimer", exp_time)
        this.commit("AuthVerified")
        state.token = token

      } else {
        this.commit("logout")
      }
    },

    completeLogin(state, data) {
      state.token = data.token
      localStorage.setItem("token", data.token)
      let dt = new Date();
      dt.setMinutes(dt.getMinutes() + 30);
      localStorage.setItem("expiry", dt)
      clearInterval(state.intervalObj);
      this.commit("LogoutTimer", dt)
      sessionStorage.setItem("refresh_token", data.refresh_token)
      if (data.push) {
        let next_url = data.next_url
        router.push(next_url)
      }
    },
    login(state, data_) {
      state.login_errors = {}
      let next_url = data_['next_url']
      delete data_['next_url']
      const LOGIN_QUERY = gql`
      mutation($email: String!, $password: String!) {
        tokenAuth(password: $password, email: $email) {
          token
          success
          refreshToken
          errors
          user {
            pk
            username
            firstName
            lastName
            email
            isActive
          }
        }
      }
    `;
      client.mutate({
        mutation: LOGIN_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          if (!data.tokenAuth.errors) {
            state.login_success = data.tokenAuth.success
            let user = data.tokenAuth.user
            state.user = user
            let dt = {
              "token": data.tokenAuth.token,
              "refresh_token": data.tokenAuth.refreshToken,
              "push": true,
              "next_url": next_url
            }
            this.commit("completeLogin", dt)
          } else {
            state.login_errors = data.tokenAuth.errors.nonFieldErrors
          }
        }
      });
    },
    register(state, data_) {
      state.register_errors = {}
      let REGISTER_QUERY = gql`
        mutation(
          $username: String!
          $email: String!
          $password1: String!
          $password2: String!
        ) {
          register(
            username: $username
            email: $email
            password1: $password1
            password2: $password2
          ) {
            success
            errors
          }
        }
      `;
      client.mutate({
        mutation: REGISTER_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          if (!data.register.errors) {
            state.register_success = data.register.success
          } else {
            state.register_errors = data.register.errors
          }
        },
      });
    },
    refreshToken() {
      let token = sessionStorage.getItem("refresh_token")
      let REFRESH_QUERY = gql`
      mutation ($token: String!) {
        refreshToken(refreshToken:$token){
          token
          refreshToken
          success
        }
      }
      `;
      client.mutate({
        mutation: REFRESH_QUERY,
        variables: { token: token },
        update: (cache, { data }) => {
          if (token) {
            let dt = {
              "token": data.refreshToken.token,
              "refresh_token": data.refreshToken.refreshToken,
              "push": false
            }
            this.commit("completeLogin", dt)
          }
        }
      })
    },

  },
  actions: {
  },
  modules: {
  },
  getters: {
    token: state => {
      return state.token
    },
    user: state => {
      return state.user
    },
    profile: state => {
      return state.user
    },
    login_errors: state => {
      return state.login_errors
    },
    login_success: state => {
      return state.login_success
    },
    register_success: state => {
      return state.register_success
    },
    register_errors: state => {
      return state.register_errors
    },
    rem_seconds: state => {
      return state.rem_seconds
    },
    chats: state => {
      return state.chats
    },
    messages: (state) => id => {
      return state.messages[id]
    }
  }
})

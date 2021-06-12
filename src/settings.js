
let DEBUG = false;
if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
  DEBUG = true
}

let BACKEND_URL = ""
let WS_URL = ""
if (DEBUG) {
  BACKEND_URL = "http://127.0.0.1:8000/graphql/"
  WS_URL = "ws://127.0.0.1:8000/ws/graphql"
}

export { DEBUG, BACKEND_URL, WS_URL }
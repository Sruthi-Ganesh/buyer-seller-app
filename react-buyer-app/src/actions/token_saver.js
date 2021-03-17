import { combineReducers } from 'redux'

const SAVE_TOKEN = 'SAVE_TOKEN'
const LOGGED_OUT = 'LOGGED_OUT'
export function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token,
  }
}

export function logout() {
  return {
    type: SAVE_TOKEN,
    token: null,
  }
}

function tokens(state = {}, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        access_token: action.token,
        logged_in: true,
      }
    case LOGGED_OUT:
      return {
        ...state,
        logged_in: false,
        access_token: null,
      }
    default:
      return state
  }
}

const tokenSaver = combineReducers({
  tokens,
})

export default tokenSaver

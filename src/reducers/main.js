import { TOKEN, USERINFO } from "@/constants/main";

const INITIAL_STATE = {
  // num: 0
  userInfo: {}
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.token
      };
    case USERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      };

    default:
      return state;
  }
}

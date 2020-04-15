import { TOKEN, USERINFO, SELECT } from "@/constants/main";

const INITIAL_STATE = {
  // num: 0
  userInfo: {},
  select: {}
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
    case SELECT:
      return {
        ...state,
        select: action.select
      };

    default:
      return state;
  }
}

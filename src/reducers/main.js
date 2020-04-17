import {
  TOKEN,
  USERINFO,
  SELECT,
  COLLECTLIST,
  RESETCOLLECTLIST
} from "@/constants/main";

const INITIAL_STATE = {
  // num: 0
  userInfo: {},
  select: {},
  ids: []
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
        select: { ...state.select, ...action.select }
      };
    case COLLECTLIST:
      return {
        ...state,
        ids: [...state.ids, action.id]
      };
    case RESETCOLLECTLIST:
      return {
        ...state,
        ids: []
      };

    default:
      return state;
  }
}

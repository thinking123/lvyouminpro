import { TOKEN, USERINFO } from "../constants/main";
import { getSiteList as _getSiteList } from "@/http/http-business";

export const updateToken = token => {
  return {
    type: TOKEN,
    token
  };
};

export const updateUserinfo = userInfo => {
  return {
    type: USERINFO,
    userInfo
  };
};

// 异步的action
export function getSiteList() {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}

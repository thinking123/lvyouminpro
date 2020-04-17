import {
  TOKEN,
  USERINFO,
  SELECT,
  COLLECTLIST,
  RESETCOLLECTLIST
} from "../constants/main";
import { collectSite } from "@/http/http-business";

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

export const updateSelect = select => {
  return {
    type: SELECT,
    select
  };
};

export const collectList = id => {
  return {
    type: COLLECTLIST,
    id
  };
};

export const resetCollectList = () => {
  return {
    type: RESETCOLLECTLIST
  };
};

// 异步的action
export function setCollect(userId, siteId, collectType, addTime) {
  return (dispatch, getState) => {
    return collectSite(userId, siteId, collectType, addTime).then(() => {
      dispatch(collectList(siteId));
    });
  };
}

export function fetchPosts(subreddit) {
  return (dispatch, getState) => {
    // dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

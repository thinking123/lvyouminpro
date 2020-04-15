import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import LoadMoreWrap from "../../components/LoadMoreWrap";

import "./index.scss";

@connect(({ main }) => ({
  main
}))
class List extends Component {
  config = {
    navigationBarTitleText: "收藏"
  };

  render() {
    return (
      <LoadMoreWrap
        url="/api/site/getCollectSiteList"
        type="collect"
        renderEmpty={() => <View>empty</View>}
      />
    );
  }
}

export default List;

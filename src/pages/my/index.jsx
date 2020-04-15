import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtAvatar } from "taro-ui";
import LoadMoreWrap from "@/components/LoadMoreWrap";

import "./index.scss";

@connect(({ main }) => ({
  main
}))
class My extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderHeader = () => {
    return (
      <View className="index">
        <AtAvatar openData={{ type: "userAvatarUrl" }} circle></AtAvatar>
        <View>
          <open-data type="userNickName"></open-data>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View className="index">
        <LoadMoreWrap
          renderHeader={() => {
            return (
              <View className="header">
              <View className="header-bg"/>

              <View className="header-body">

                <AtAvatar
                  openData={{ type: "userAvatarUrl" }}
                  circle
                ></AtAvatar>
                <View className="header-name">
                  <open-data type="userNickName"></open-data>
                </View>
              </View>
              </View>
            );
          }}
          url="/api/site/getCollectSiteList"
          itemType="list"
        />
      </View>
    );
  }
}

export default My;

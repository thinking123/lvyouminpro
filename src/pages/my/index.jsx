import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import LoadMoreWrap from "@/components/LoadMoreWrap";
import { AtList, AtListItem, AtAvatar } from "taro-ui";
import "./index.scss";

@connect(({ main }) => ({
  main
}))
class My extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    refKey: new Date().getTime()
  };
  componentDidShow() {
    this.setState({
      refKey: new Date().getTime()
    });
  }
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
  onNav = () => {
    Taro.navigateTo({
      url: "/pages/update/index"
    });
  };

  renderUserInfo = () => {
    const { trueName, userPhone, userWork } = this.props.main.userInfo;

    return (
      <View className="userInfo">
        <AtList>
          <AtListItem title="真实姓名" extraText={trueName || ""} />
          <AtListItem title="手机号" extraText={userPhone || ""} />
          <AtListItem title="单位名" extraText={userWork || ""} />
        </AtList>
      </View>
    );
  };
  render() {
    const { refKey } = this.state;
    return (
      <View className="index">
        <LoadMoreWrap
          reloadKey={refKey}
          renderHeader={() => {
            return (
              <View>
                <View className="header">
                  <View className="header-bg" />

                  <View className="header-body" onClick={this.onNav}>
                    <AtAvatar
                      openData={{ type: "userAvatarUrl" }}
                      circle
                    ></AtAvatar>
                    <View className="header-content">
                      <View className="header-name">
                        <open-data type="userNickName"></open-data>
                      </View>
                    </View>
                  </View>
                </View>
                {this.renderUserInfo()}
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

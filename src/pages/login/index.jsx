import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { wxlogin } from "@/http/http-business";
import { updateToken, updateUserinfo } from "@/actions/main";
import { _wxLogin, _wxGetUserInfo } from "@/common/wx";

import "./index.scss";

@connect(
  ({ main }) => ({
    main
  }),
  dispatch => ({
    setToken(token) {
      dispatch(updateToken(token));
    },
    setUserInfo(userInfo) {
      dispatch(updateUserinfo(userInfo));
    }
  })
)
class Login extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderWxButton = () => {
    return (
      <Button
        class="CWXButton external-cls"
        onGetUserInfo={this.onGetUserInfo}
        type="primary"
        openType="getUserInfo"
      >
        微信登入
      </Button>
    );
  };
  onGetUserInfo = e => {
    const { nickName, avatarUrl } = e.detail.userInfo;
    _wxLogin()
      .then(code => {
        return wxlogin(code, avatarUrl, nickName);
      })
      .then(res => {
        this.props.setUserInfo(res);
        Taro.switchTab({
          url: "/pages/home/index"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return <View className="index">{this.renderWxButton()}</View>;
  }
}

export default Login;

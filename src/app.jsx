import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";
// import {
//   _wxGetSetting,
//   _wxGetUserInfo,
//   _wxLogin,
//   wx_getSystemInfo
// } from "@/common/wx";
// import { showMsg } from "@/common/utils";
import configStore from "./store";
import "taro-ui/dist/style/index.scss";
import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/login/index",
      "pages/home/index",
      "pages/my/index",
      "pages/detail/index",
      "pages/list/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#AAB3C2",
      selectedColor: "#e44855",
      backgroundColor: "#FFF",
      list: [
        {
          pagePath: "pages/home/index",
          text: "路线",
          iconPath:"../static/img/home.png",
          selectedIconPath:"../static/img/home-sel.png",
        },
        {
          pagePath: "pages/my/index",
          text: "我的",
          iconPath:"../static/img/my.png",
          selectedIconPath:"../static/img/my-sel.png",
        }
      ]
    },
    window: {
      navigationBarBackgroundColor: "#e44855"
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  // init() {
  //   this.loginWx();
  // }

  // async loginWx() {
  //   try {
  //     await _wxLogin();
  //     const setting = await _wxGetSetting();
  //     if (setting["scope.userInfo"]) {
  //       await _wxGetUserInfo();
  //     }
  //     const systemInfo = await wx_getSystemInfo();
  //     console.log("systemInfo", systemInfo);
  //     this.$options.globalData.systemInfo = systemInfo;
  //   } catch (e) {
  //     showMsg(e);
  //   } finally {
  //     store.commit("popQueue", "loginWx");
  //   }
  // }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));

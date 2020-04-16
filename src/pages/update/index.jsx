import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.scss";
import { updateToken, updateUserinfo } from "@/actions/main";

import { updateMsgById } from "@/http/http-business";

@connect(
  ({ main }) => ({
    main
  }),
  dispatch => ({
    setUserInfo(userInfo) {
      dispatch(updateUserinfo(userInfo));
    }
  })
)
class Update extends Component {
  config = {
    navigationBarTitleText: "更新信息"
  };

  state = {
    value1: "",
    value2: "",
    value3: ""
  };

  componentDidMount() {
    const {
      main: { trueName, userPhone, userWork }
    } = this.props;

    this.setState({
      value1: trueName || "",
      value2: userPhone || "",
      value3: userWork || ""
    });
  }
  onSubmit() {
    const { main, setUserInfo } = this.props;
    const { value1, value2, value3 } = this.state;

    // setUserInfo({
    //   ...main.userInfo,
    //   trueName: value1,
    //   userPhone: value2,
    //   userWork: value3
    // });
    // Taro.navigateBack();

    updateMsgById(main.userInfo.id, value1, value2, value3).then(() => {
      setUserInfo({
        ...main.userInfo,
        trueName: value1,
        userPhone: value2,
        userWork: value3
      });
      Taro.navigateBack();
    });
  }

  onReset() {}

  handleChange = (v, e) => {
    const { id } = e.target;
    this.setState({
      [id]: v
    });
  };
  renderHeader = () => {
    return <View className="header">个人信息</View>;
  };
  render() {
    return (
      <View>
        {this.renderHeader()}
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name="value1"
            title="姓名"
            type="text"
            placeholder="请输入姓名"
            value={this.state.value1}
            onChange={this.handleChange}
          />
          <AtInput
            name="value2"
            title="电话"
            type="number"
            placeholder="请输入电话"
            value={this.state.value2}
            onChange={this.handleChange}
          />
          <AtInput
            name="value3"
            title="单位名"
            type="text"
            placeholder="请输入单位名"
            value={this.state.value3}
            onChange={this.handleChange}
          />
          <AtButton formType="submit" className="submit">
            提交
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default Update;

import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { collectSite } from "@/http/http-business";
import { View, Text } from "@tarojs/components";
import { urlParams } from "@/common/utils";
import "./index.scss";

class CardPanel extends Component {
  static externalClasses = ["ext-cls"];

  state = {
    isCollect: false
  };
  componentDidMount() {
    const { type } = this.props;
    const isCollect = type == "collect";
    console.log("type : ", type, isCollect);
    this.setState({
      isCollect
    });
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onCollect = e => {
    const { onCollect, card } = this.props;
    const { isCollect } = this.state;

    e.stopPropagation();

    if (!isCollect) {
      onCollect(card, () => {
        this.setState({
          isCollect: true
        });
      });
    }
  };

  onClick() {
    const {
      card: { id },
      type
    } = this.props;
    const { isCollect } = this.state;

    const obj = {
      id
    };
    if (type == "collect" || isCollect) {
      obj.isCollect = true;
    }
    const url = urlParams("/pages/detail/index", obj);
    Taro.navigateTo({
      url
    });
  }
  renderTime = () => {
    const { type, card: { addTime, collectType } = {} } = this.props;
    if (type == "collect") {
      return (
        <View>
          <View>{!!addTime ? (addTime == 0 ? "上午" : "下午") : ""}</View>
          <View>{collectType}</View>
        </View>
      );
    }
    return null;
  };
  render() {
    // const { img, title, desc, isCollect, onCollect, onClick } = this.props;
    const {
      card: { siteBanner = "", siteName: title, siteIntroduce: desc } = {}
      // onCollect,
      // onClick
    } = this.props;
    const { isCollect } = this.state;
    const cls = `at-icon heart-icon at-icon-heart${isCollect ? "-2" : ""}`;
    const img = siteBanner.split(",")[0];
    return (
      <View className="container ext-cls" onClick={this.onClick}>
        <Image className="img" src={img} />
        <View className="body">
          <View className="content">
            {this.renderTime()}
            <View className="title">{title}</View>
            <View className="desc">{desc}</View>
          </View>
          <View className="heart">
            <View className={cls} onClick={this.onCollect}></View>
            <View className="heart-text" onClick={this.onCollect}>
              {isCollect ? "已经加入" : "加入行程"}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CardPanel;

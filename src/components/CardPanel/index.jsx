import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { urlParams } from "@/common/utils";
import "./index.scss";

@connect(({ main }) => ({
  main
}))
class CardPanel extends Component {
  static externalClasses = ["ext-cls"];

  state = {
    isCollect: false
  };
  componentDidMount() {
    const {
      type,
      card,
      main: { ids }
    } = this.props;
    const isCollect = type == "collect" || ids.includes(card.id);
    console.log("type : ", type, isCollect);
    this.setState({
      isCollect
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      card,
      main: { ids }
    } = nextProps;
    const { isCollect } = this.state;
    if (nextProps.main.ids.includes(card.id) && !isCollect) {
      console.log("render componentWillReceiveProps");
      this.setState({
        isCollect: true
      });
    }
  }

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
    const { type, card: { addTime, collectType, openTime } = {} } = this.props;
    if (type == "collect") {
      return (
        <View className="time">
          <View>{addTime}</View>
          <View>
            {!!collectType ? (collectType == 0 ? "上午" : "下午") : ""}
          </View>
        </View>
      );
    }
    return (
      <View className="time">
        <View>开放时间：{openTime}</View>
      </View>
    );
  };

  render() {
    const {
      card: { siteBanner = "", siteName: title, siteIntroduce: desc } = {},
      type
    } = this.props;
    const { isCollect } = this.state;
    const img = siteBanner.split(",")[0];
    const cls = `at-icon heart-icon at-icon-heart${isCollect ? "-2" : ""}`;
    return (
      <View className="container ext-cls" onClick={this.onClick}>
        <Image className="img" src={img} />
        <View className="body">
          <View className="content">
            <View className="title">{title}</View>
            {this.renderTime()}
            <View className="desc">{desc}</View>
          </View>
          {type != "collect" && (
            <View className="heart">
              <View className={cls} onClick={this.onCollect}></View>
              <View className="heart-text" onClick={this.onCollect}>
                {isCollect ? "已经加入" : "加入行程"}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default CardPanel;

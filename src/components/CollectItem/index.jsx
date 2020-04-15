import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { collectSite } from "@/http/http-business";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class CollectItem extends Component {
  static externalClasses = ["ext-cls"];

  state = {
    isCollect: false
  };
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
      card: { id }
    } = this.props;

    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&isCollect=${true}`
    });
  }
  renderTime = () => {
    const { type } = this.props;
    if (type == "collect") {
      return <View></View>;
    }
    return null;
  };
  render() {
    const { card: { siteName: title, openTime } = {} } = this.props;
    const { isCollect } = this.state;
    return (
      <View className="container ext-cls" onClick={this.onClick}>
        <View className="title">{title}</View>
        <View className="openTime">{openTime}</View>
      </View>
    );
  }
}

export default CollectItem;

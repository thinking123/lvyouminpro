import Taro, { Component } from "@tarojs/taro";

import { View, Text } from "@tarojs/components";
import "./index.scss";

class CardPanel extends Component {
  static externalClasses = ["ext-cls"];

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onCollect = e => {
    const { onCollect } = this.props;
    e.stopPropagation();
    onCollect();
  };
  render() {
    const { img, title, desc, isCollect, onCollect, onClick } = this.props;
    return (
      <View className="container ext-cls" onClick={onClick}>
        <Image className="img" src={img} />
        <View className="body">
          <View className="content">
            <View className="title">{title}</View>
            <View className="desc">{desc}</View>
          </View>
          <View className="heart">
            <View
              className="at-icon at-icon-heart heart-icon"
              onClick={this.onCollect}
            ></View>
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

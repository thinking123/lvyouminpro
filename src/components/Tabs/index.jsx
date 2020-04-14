import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import "./index.scss";
//Tabs

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _scrollIntoView: ""
    };
  }

  updateState = idx => {
    if (this.props.scroll) {
      const index = Math.max(idx - 1, 0);
      this.setState({
        _scrollIntoView: `tab${index}`
      });
    }
  };

  handleClick(index, event) {
    this.props.onClick(index, event);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.updateState(nextProps.current);
    }
  }

  componentDidMount() {
    this.updateState(this.props.current);
  }

  render() {
    const {
      customStyle,
      className,
      height,
      tabDirection = "horizontal",
      animated,
      tabList = [],
      scroll,
      current
    } = this.props;
    const { _scrollIntoView } = this.state;
    const tabItems = tabList.map((item, idx) => {
      const itemCls = classNames({
        tabs__item: true,
        "tabs__item--active": current === idx
      });

      return (
        <View
          className={itemCls}
          id={`tab${idx}`}
          key={item.title}
          onClick={this.handleClick.bind(this, idx)}
        >
          {item.title}
          <View className="tabs__item-underline"></View>
        </View>
      );
    });
    const rootCls = classNames(
      {
        tabs: true
      },
      className
    );
    const scrollX = tabDirection === "horizontal";

    return (
      <View className={rootCls}>
        {scroll ? (
          <ScrollView
            id={this._tabId}
            className="tabs__header"
            scrollX={scrollX}
            scrollWithAnimation
            scrollIntoView={_scrollIntoView}
          >
            {tabItems}
          </ScrollView>
        ) : (
          <View id={this._tabId} className="tabs__header">
            {tabItems}
          </View>
        )}
      </View>
    );
  }
}

export default Tabs;

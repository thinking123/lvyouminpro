import Taro, { Component } from "@tarojs/taro";

import { View, ScrollView } from "@tarojs/components";
import "./index.scss";
import { get } from "@/http/http";
import { showMsg, urlParams, delNullProperty, debounce } from "@/common/utils";

class LoadMoreWrap extends Component {
  static externalClasses = ["ext-cls"];

  state = {
    isLoading: false,
    items: [],
    total: 0,
    pages: 0,
    pageNum: 0,
    isEnd: false
  };
  constructor() {
    super(...arguments);
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onScrollToLower = e => {
    const { isLoading, isEnd } = this.state;
    if (!isLoading && !isEnd) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          this.getMore();
        }
      );
    }
  };

  getMore = () => {
    const { url } = this.props;
    const { pageNum } = this.state;

    let _url = urlParams(url, { pageNum, siteId });
  };
  render() {
    const { renderList, renderHeader, renderFooter } = this.props;
    const { items, isLoading } = this.state;
    return (
      <ScrollView
        className="container ext-cls"
        scrollY
        onScrollToLower={this.onScrollToLower}
      >
        {renderHeader && renderHeader()}
        {renderList && renderList(items)}
        {isLoading ? "isLoading" : ""}
        {renderFooter && renderFooter()}
      </ScrollView>
    );
  }
}

export default LoadMoreWrap;

import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import "./index.scss";
import { get } from "@/http/http";
import { showMsg, urlParams, delNullProperty, debounce } from "@/common/utils";
import { connect } from "@tarojs/redux";
import CardPanel from "@/components/CardPanel";

@connect(({ main }) => ({
  main
}))
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
  _loading = false;
  constructor() {
    super(...arguments);
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidMount() {
    this.getMore();
  }
  componentDidHide() {}

  onScrollToLower = e => {
    const { isLoading, isEnd } = this.state;
    console.log("onScrollToLower", isLoading, isEnd);
    if (!this._loading && !isEnd) {
      this.getMore();
    }
  };

  getMore = () => {
    this._loading = true;
    this.setState({
      isLoading: true
    });

    const { url, params } = this.props;
    const { pageNum } = this.state;

    let _url = urlParams(url, {
      pageNum: pageNum + 1,
      ...params,
      userId: this.props.main.userInfo.id
    });

    get(_url)
      .then(this.parseRes)
      .finally(() => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            this._loading = false;
          }
        );
      });
  };

  parseRes = res => {
    const { pageNum, pages, total, list = [] } = res.rows;
    const { items: _items } = this.state;

    console.log("res", res);
    const isEnd = pageNum == pages;
    const items = [..._items, ...list];
    this.setState({
      pageNum,
      pages,
      total,
      isEnd,
      items
    });
  };
  render() {
    const {
      renderHeader,
      // template as Template,
      key = new Date().getTime(),
      height
    } = this.props;
    const { items, isLoading } = this.state;
    return (
      <ScrollView
        style={{ height: `${height}px` }}
        key={key}
        className="container ext-cls"
        scrollY
        onScrollToLower={this.onScrollToLower}
      >
        {renderHeader()}
        {items.map(c => (
          <CardPanel ext-cls="card" card={c} />
        ))}
        {isLoading ? "isLoading" : ""}
      </ScrollView>
    );
  }
}

export default LoadMoreWrap;

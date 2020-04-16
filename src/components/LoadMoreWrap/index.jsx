import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import "./index.scss";
import { get } from "@/http/http";
import { showMsg, urlParams, delNullProperty, debounce } from "@/common/utils";
import { connect } from "@tarojs/redux";
import CardPanel from "@/components/CardPanel";
import CollectItem from "@/components/CollectItem";

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadKey !== this.props.reloadKey) {
      this.reload();
    }
  }

  reload() {
    this.setState(
      {
        isLoading: false,
        items: [],
        total: 0,
        pages: 0,
        pageNum: 0,
        isEnd: false
      },
      () => {
        this.getMore();
      }
    );
  }
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
      ...delNullProperty(params),
      userId: this.props.main.userInfo.id
    });

    const fin = () => {
      this.setState(
        {
          isLoading: false
        },
        () => {
          this._loading = false;
        }
      );
    };

    get(_url)
      .then(this.parseRes)
      .then(fin, fin);
  };

  parseRes = res => {
    if (!res || res.status != 200) {
      this.setState({
        isEnd: true,
        isError: true,
        errMsg: res && res.message ? res.message : "error"
      });
      return;
    }
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

  renderList = () => {
    const { items } = this.state;
    const { itemType = "card", onCollect, type } = this.props;

    if (itemType == "list") {
      return (
        <View className="my">
          <View className="my-t">我的行程</View>
          {items.map(c => (
            <CollectItem ext-cls="list" card={c} key={c.id} />
          ))}
        </View>
      );
    }
    return items.map(c => (
      <CardPanel
        ext-cls="card"
        card={c}
        onCollect={onCollect}
        type={type}
        key={c.id}
      />
    ));
  };

  renderLoading = isLoading =>
    isLoading && <View className="at-icon at-icon-loading-2 loading" />;
  renderFooter = () => <View className="footer"></View>;
  render() {
    const {
      key = new Date().getTime(),
      onCollect,
      type = "",
      renderHeader,
      renderEmpty,
      itemType = "card",
      height = "100%"
    } = this.props;
    const { items, isLoading, isError, errMsg, isEnd } = this.state;
    const show = isEnd && items.length == 0;
    return (
      <ScrollView
        style={{ height: `${height}`, width: "100%" }}
        className="container ext-cls"
        scrollY
        onScrollToLower={this.onScrollToLower}
      >
        {renderHeader()}
        {this.renderList()}
        {this.renderLoading(isLoading)}
        {isError ? errMsg : ""}
        {renderEmpty(show)}
        {this.renderFooter()}
      </ScrollView>
    );
  }
}

export default LoadMoreWrap;

import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import SelMenu from "../../components/SelMenu";
import CardPanel from "../../components/CardPanel";
import LoadMoreWrap from "../../components/LoadMoreWrap";
import { getSiteList, getClassList } from "@/http/http-business";

import "./index.scss";
@connect(({ main }) => ({
  main
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  constructor() {
    super(...arguments);
    this.state = {
      zone: "",
      time: "",
      date: "",
      zones: ["美国", "中国", "巴西", "日本"],
      times: ["上午", "下午"],
      tabList: [],
      restH: 0
    };
  }
  componentDidMount() {
    const { windowHeight } = Taro.getSystemInfoSync();

    Taro.createSelectorQuery()
      .in(this.tab.$scope)
      .select(".at-tabs__header")
      .boundingClientRect(rect => {
        const h = rect.height;
        const restH = windowHeight - h;
        console.log("restH", restH);

        this.setState({
          restH
        });
      })
      .exec();

    getClassList().then(res => {
      this.setState({
        tabList: res.map(r => {
          r.title = r.className;
          return r;
        })
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    // getSiteList(this.props.main.userInfo.id, 1);
  }

  componentDidHide() {}
  refTabs = node => (this.tab = node);
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  onSelChange = (id, v) => {
    if (id == "date") {
      this.setState({
        date: v
      });
    } else {
      this.setState({
        [id]: this.state[`${id}s`][v]
      });
    }
  };

  onNavList = () => {};

  renderFixedBtn = () => {
    return (
      <View className="fixed-btn">
        <View
          className="at-icon at-icon-map-pin map-pin"
          onClick={this.onNavList}
        ></View>
      </View>
    );
  };

  render() {
    const { zones, zone, time, date, times, tabList, restH } = this.state;
    return (
      <View className="index">
        {this.renderFixedBtn()}
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          scroll
          onClick={this.handleClick.bind(this)}
          ref={this.refTabs}
        >
          {tabList.map((tab, index) => {
            return (
              <AtTabsPane
                current={this.state.current}
                index={tab.id}
                key={tab.id}
              >
                <LoadMoreWrap
                  url="/api/site/getSiteList"
                  height={restH}
                  renderHeader={() => (
                    <SelMenu
                      ext-cls="sel-menu"
                      zone={zone}
                      time={time}
                      date={date}
                      zones={zones}
                      times={times}
                      onSelChange={this.onSelChange}
                    />
                  )}
                />
              </AtTabsPane>
            );
          })}
        </AtTabs>
      </View>
    );
  }
}

export default Index;

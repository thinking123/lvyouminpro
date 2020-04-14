import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import SelMenu from "../../components/SelMenu";
import CardPanel from "../../components/CardPanel";
import LoadMoreWrap from "../../components/LoadMoreWrap";
import Tabs from "../../components/Tabs";
import { getSiteList, getClassList, getCityList } from "@/http/http-business";

import "./index.scss";
@connect(({ main }) => ({
  main
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  refKey = new Date().getTime();
  constructor() {
    super(...arguments);
    this.state = {
      zone: -1,
      time: -1,
      date: "",
      zones: [],
      times: ["上午", "下午"],
      tabList: [],
      restH: 0,
      current: 0,
      refKey: new Date().getTime()
    };
  }
  componentDidMount() {
    const { windowHeight } = Taro.getSystemInfoSync();

    Taro.createSelectorQuery()
      .in(this.$scope)
      .select(".header")
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

    getCityList().then(res => {
      this.setState({
        zones: res.map(r => {
          // r.title = r.cityCaption;
          return r.cityCaption;
        })
      });
    });
  }
  refTabs = node => (this.tab = node);
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  onSelChange = (id, v) => {
    this.setState({
      [id]: v,
      refKey: new Date().getTime()
    });
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

  renderSelMenu = () => {
    return (
      <SelMenu
        key={tab.id}
        ext-cls="sel-menu"
        zone={zone}
        time={time}
        date={date}
        zones={zones}
        times={times}
        onSelChange={this.onSelChange}
      />
    );
  };

  render() {
    const {
      zones,
      zone,
      time,
      date,
      times,
      tabList,
      restH,
      current,
      refKey
    } = this.state;
    const cityCode = zone >= 0 ? zones[zone].adCode : "";
    return (
      <View className="index">
        {this.renderFixedBtn()}

        <View className="header">
          <Tabs
            current={current}
            tabList={tabList}
            scroll
            onClick={this.handleClick.bind(this)}
            ref={this.refTabs}
          ></Tabs>
          <SelMenu
            ext-cls="sel-menu"
            zone={zone}
            time={time}
            date={date}
            zones={zones}
            times={times}
            onSelChange={this.onSelChange}
          />
        </View>

        {tabList.map((tab, index) => {
          return (
            <View
              style={{
                height: `${restH}px`,
                display: `${index == current ? "block" : "none"}`
              }}
              key={tab.id}
            >
              <LoadMoreWrap
                reloadKey={refKey}
                url="/api/site/getSiteList"
                params={{
                  cityCode,
                  siteClass: tab.id
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

export default Index;

import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import SelMenu from "../../components/SelMenu";
import CardPanel from "../../components/CardPanel";
import LoadMoreWrap from "../../components/LoadMoreWrap";
import Tabs from "../../components/Tabs";
import { updateSelect } from "@/actions/main";

import {
  getSiteList,
  getClassList,
  getCityList,
  collectSite
} from "@/http/http-business";

import "./index.scss";
@connect(
  ({ main }) => ({
    main
  }),
  dispatch => ({
    updateSelect(select) {
      dispatch(updateSelect(select));
    }
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };
  range = 30;

  constructor() {
    super(...arguments);
    let d = new Date();
    d.setDate(d.getDate() + this.range);
    const start = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");

    this.state = {
      zone: -1,
      time: 0,
      date: start,
      zones: [],
      times: ["上午", "下午"],
      tabList: [
        {
          title: "全部"
        }
      ],
      citys: [],
      restH: 0,
      restHAll: 0,
      current: 0,
      refKey: new Date().getTime()
    };
  }
  componentDidMount() {
    const { updateSelect } = this.props;
    const { time, date } = this.state;
    updateSelect({
      time,
      date
    });
    this.getH();
    getClassList().then(res => {
      this.setState(
        preState => ({
          tabList: [
            ...preState.tabList,
            ...res.map(r => {
              r.title = r.className;
              return r;
            })
          ]
        }),
        () => {
          setTimeout(() => {
            this.getH();
          });
        }
      );
      // this.setState(
      //   {
      //     tabList: res.map(r => {
      //       r.title = r.className;
      //       return r;
      //     })
      //   },
      //   () => {
      //     setTimeout(() => {
      //       this.getH();
      //     });
      //   }
      // );
    });

    getCityList().then(res => {
      this.setState({
        zones: [
          "",
          ...res.map(r => {
            return r.cityCaption;
          })
        ],
        citys: res
      });
    });
  }
  componentDidShow() {
    this.setState({
      refKey: new Date().getTime()
    });
  }

  refTabs = node => (this.tab = node);
  handleClick(value) {
    const { restHAll, restH } = this.state;
    this.setState(
      {
        current: value
      },
      () => {
        if (restHAll == 0 || restH == 0) this.getH();
      }
    );
  }

  onSelChange = (id, v) => {
    const { updateSelect } = this.props;
    const s = {
      [id]: v
    };
    if (id == "zone") {
      s.refKey = new Date().getTime();
    }
    updateSelect({
      [id]: v
    });
    this.setState(s);
  };

  onNavList = () => {
    Taro.navigateTo({
      url: "/pages/list/index"
    });
  };

  renderFixedBtn = () => {
    return (
      <View className="fixed-btn" onClick={this.onNavList}>
        <View className="at-icon at-icon-map-pin map-pin"></View>
      </View>
    );
  };

  getH = () => {
    const { windowHeight, screenHeight } = Taro.getSystemInfoSync();
    const { current } = this.state;

    Taro.createSelectorQuery()
      .in(this.$scope)
      .select(".header")
      .boundingClientRect(rect => {
        const h = rect.height;
        const restH = windowHeight - h;

        if (current != 0) {
          console.log("restH", restH);

          this.setState({
            restH
          });
        }
        if (current == 0) {
          console.log("restHAll", restH);

          this.setState({
            restHAll: restH
          });
        }
      })
      .exec();
  };

  onCollect = (card, cb) => {
    const { time, date } = this.state;
    collectSite(this.props.main.userInfo.id, card.id, time + 1, date).then(
      res => {
        cb();
      }
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
      restHAll,
      current,
      refKey,
      citys
    } = this.state;
    const cityCode = zone >= 1 ? citys[zone - 1].adCode : "";

    return (
      <View className="index">
        {this.renderFixedBtn()}

        <View className="header">
          <Tabs
            current={current}
            tabList={tabList}
            scroll
            ext-cls="tablist"
            onClick={this.handleClick.bind(this)}
            ref={this.refTabs}
          ></Tabs>
          <SelMenu
            show={current != 0}
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
                height: `${current == 0 ? restHAll : restH}px`,
                display: `${index == current ? "block" : "none"}`
              }}
              key={tab.id}
            >
              <LoadMoreWrap
                reloadKey={index == 0 ? "1" : refKey}
                url="/api/site/getSiteList"
                params={
                  index == 0
                    ? {}
                    : {
                        cityCode,
                        siteClass: tab.id
                      }
                }
                onCollect={this.onCollect}
                renderEmpty={show => {
                  console.log("show : ", show);
                  if (show) return <View className="empty">没有数据</View>;

                  return null;
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

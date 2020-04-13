import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import SelMenu from "../../components/SelMenu";
import CardPanel from "../../components/CardPanel";
import "./index.scss";

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
      tabList: [
        { title: "标签页1" },
        { title: "标签页2" },
        { title: "标签页3" },
        { title: "标签页4" },
        { title: "标签页5" },
        { title: "标签页6" },
        { title: "标签页7" }
      ],
      cards: [
        {
          cityCode: "",
          id: "1",
          openTime: "",
          siteAddress: "",
          siteBanner: "https://qiniu.kaimingwutong.com/home_img_kaiming@3x.png",
          siteClass: "",
          siteDetailsImage: "",
          siteIntroduce:
            "到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假到了放假等放假",
          siteName: "siteName",
          sort: "",
          userId: "1"
        },
        {
          cityCode: "",
          id: "2",
          openTime: "",
          siteAddress: "",
          siteBanner: "https://qiniu.kaimingwutong.com/home_img_kaiming@3x.png",
          siteClass: "",
          siteDetailsImage: "",
          siteIntroduce: "siteIntroduce2",
          siteName: "siteName2",
          sort: "",
          userId: "2"
        }
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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

  onCollect = id => e => {
    console.log(id);
  };

  onClickCardPanel = () => {
    console.log("onClickCardPanel");
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
    const { zones, zone, time, date, times, tabList, cards } = this.state;
    return (
      <View className="index">
        {this.renderFixedBtn()}
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          scroll
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View>
              <SelMenu
                ext-cls="sel-menu"
                zone={zone}
                time={time}
                date={date}
                zones={zones}
                times={times}
                onSelChange={this.onSelChange}
              />

              {cards.map(c => (
                <CardPanel
                  ext-cls="card"
                  key={c.id}
                  img={c.siteBanner}
                  title={c.siteName}
                  desc={c.siteIntroduce}
                  isCollect={false}
                  onClick={this.onClickCardPanel}
                  onCollect={this.onCollect(c.id)}
                />
              ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页二的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页三的内容
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index;

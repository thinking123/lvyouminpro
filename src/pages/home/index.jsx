import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/counter";
import SelMenu from "../../components/SelMenu";
import CardPanel from "../../components/CardPanel";
import LoadMoreWrap from "../../components/LoadMoreWrap";
import { getSiteList } from "@/http/http-business";

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
      ],
      restH: 0
    };
  }
  componentDidMount() {
    const { windowHeight } = Taro.getSystemInfoSync();

    Taro.createSelectorQuery()
      .in(this.tab.$scope)
      .select(".at-tabs__header")
      .boundingClientRect(rect => {
        // console.log("rect", rect);
        // if (all && Array.isArray(rect) && rect.length) {
        //   resolve(rect);
        // }

        // if (!all && rect) {
        //   resolve(rect);
        // }
        const h = rect.height;
        const restH = windowHeight - h;
        console.log("restH", restH);

        this.setState({
          restH
        });
      })
      .exec();
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

  // renderLoadMoreChildrenHeader = () => {};
  renderList = cards => {
    return cards.map(c => (
      <CardPanel
        ext-cls="card"
        key={c.id}
        img={c.siteBanner}
        title={c.siteName}
        desc={c.siteIntroduce}
        isCollect={false}
        onClick={() => {}}
        onCollect={() => {}}
      />
    ));
  };
  render() {
    const {
      zones,
      zone,
      time,
      date,
      times,
      tabList,
      cards,
      restH
    } = this.state;
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
          <AtTabsPane current={this.state.current} index={0}>
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
              // template={CardPanel}
              // renderList={cards =>
              //   cards.map(c => (
              //     <CardPanel
              //       ext-cls="card"
              //       key={c.id}
              //       img={c.siteBanner}
              //       title={c.siteName}
              //       desc={c.siteIntroduce}
              //       isCollect={false}
              //       onClick={this.onClickCardPanel}
              //       onCollect={this.onCollect(c.id)}
              //     />
              //   ))
              // }
            />
            {/* <View>
              <SelMenu
                ext-cls="sel-menu"
                zone={zone}
                time={time}
                date={date}
                zones={zones}
                times={times}
                onSelChange={this.onSelChange}
              />

              {this.renderList(cards)}
            </View> */}
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
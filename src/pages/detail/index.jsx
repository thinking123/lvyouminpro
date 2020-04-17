import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { getSiteById, collectSite } from "@/http/http-business";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtList, AtListItem, AtAvatar } from "taro-ui";
import { setCollect } from "@/actions/main";

import "./index.scss";

@connect(
  ({ main }) => ({
    main
  }),
  dispatch => ({
    setCollect(userId, siteId, collectType, addTime) {
      return dispatch(setCollect(userId, siteId, collectType, addTime));
    }
  })
)
class Detail extends Component {
  config = {
    navigationBarTitleText: "详情"
  };
  state = {
    site: {}
  };
  componentDidMount() {
    getSiteById(this.$router.params.id).then(site => {
      const isCollect = this.$router.params.isCollect;
      site.isCollect = isCollect;
      this.setState({ site });
    });
  }

  onCollect = e => {
    const {
      main: {
        select: { time, date }
      },
      setCollect
    } = this.props;

    e.stopPropagation();
    const { site } = this.state;
    const { isCollect, id } = site;
    if (!isCollect) {
      setCollect(this.props.main.userInfo.id, id, time + 1, date).then(res => {
        this.setState({ site: { ...site, isCollect: true } });
      });
    }
  };

  renderContent = () => {
    const {
      site: { siteName, siteIntroduce, siteAddress, openTime, isCollect }
    } = this.state;
    const cls = `at-icon heart-icon at-icon-heart${isCollect ? "-2" : ""}`;

    return (
      <AtList>
        <AtListItem title={siteName} note={`开放时间:${openTime}`} />
        <AtListItem title="地址" note={siteAddress} />
        <AtListItem title="简介" note={siteIntroduce} />
        <View className="heart">
          <View className={cls} onClick={this.onCollect}></View>
          <View className="heart-text" onClick={this.onCollect}>
            {isCollect ? "已经加入" : "加入行程"}
          </View>
        </View>
      </AtList>
    );
  };
  render() {
    const {
      site: {
        siteName,
        isCollect,
        siteIntroduce,
        siteAddress,
        siteDetailsImage = "",
        siteBanner = "",
        openTime
      }
    } = this.state;
    const cls = `at-icon heart-icon at-icon-heart${isCollect ? "-2" : ""}`;

    const banners = siteBanner.split(",");
    const imgs = siteDetailsImage.split(",");
    return (
      <View className="index">
        <Swiper
          className="test-h"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          {banners.map((b, index) => (
            <SwiperItem key={index}>
              <Image className="banner" src={b} />
            </SwiperItem>
          ))}
        </Swiper>
        <View className="body">
          <View className="content">{this.renderContent()}</View>
        </View>

        {imgs.map((b, index) => (
          <Image className="img" src={b} />
        ))}
      </View>
    );
  }
}

export default Detail;

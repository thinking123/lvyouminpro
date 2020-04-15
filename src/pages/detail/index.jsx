import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { getSiteById, collectSite } from "@/http/http-business";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

@connect(({ main }) => ({
  main
}))
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
      }
    } = this.props;
    e.stopPropagation();
    const { site } = this.state;
    const { isCollect, id } = site;
    if (!isCollect) {
      collectSite(this.props.main.userInfo.id, id, time + 1, date).then(res => {
        this.setState({ site: { ...site, isCollect: true } });
      });
    }
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
        
          <View className="content">
            <View>{siteName}</View>
        <View>{siteAddress}</View>

        <View>{siteIntroduce}</View>
       
</View>
 <View className="heart">
          <View className={cls} onClick={this.onCollect}></View>
          <View className="heart-text" onClick={this.onCollect}>
            {isCollect ? "已经加入" : "加入行程"}
          </View>
        </View>
</View>
      
        {imgs.map((b, index) => (
          <Image className="img" src={b} />
        ))}
      </View>
    );
  }
}

export default Detail;

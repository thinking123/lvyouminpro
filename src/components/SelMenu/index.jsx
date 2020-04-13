import Taro, { Component } from "@tarojs/taro";

import { View, Text, Picker } from "@tarojs/components";
import "./index.scss";

class SelMenu extends Component {
  static externalClasses = ["ext-cls"];

  range = 20;
  constructor(props) {
    super(props);
    let d = new Date();
    const start = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
    d.setDate(d.getDate() + this.range);
    const end = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
    this.state = {
      start,
      end
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  renderEmptyLabel = () => {
    return <View className="empty-label"></View>;
  };
  renderLabel = type => {
    // const { zone, time, date } = this.state;
    const { zone, time, date } = this.props;

    if (type == "zone") {
      return <View className="label">{!!zone ? zone : "目的地"}</View>;
    }

    if (type == "time") {
      return <View className="label">{!!time ? time : "时间"}</View>;
    }

    if (type == "date") {
      return (
        <View className="label label-date">{!!date ? date : "出行时间"}</View>
      );
    }
  };
  onChange = e => {
    const { id } = e.currentTarget.dataset;
    const { onSelChange } = this.props;

    onSelChange(id, e.detail.value);
  };

  render() {
    const { start, end } = this.state;
    const { zones, times } = this.props;
    return (
      <View className="container ext-cls">
        <Picker
          mode="selector"
          range={zones}
          onChange={this.onChange}
          data-id="zone"
        >
          {this.renderLabel("zone")}
        </Picker>
        <Picker
          mode="date"
          onChange={this.onChange}
          start={start}
          end={end}
          data-id="date"
        >
          {this.renderLabel("date")}
        </Picker>
        <Picker
          mode="selector"
          range={times}
          onChange={this.onChange}
          data-id="time"
        >
          {this.renderLabel("time")}
        </Picker>
      </View>
    );
  }
}

export default SelMenu;

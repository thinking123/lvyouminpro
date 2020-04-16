import Taro, { Component } from "@tarojs/taro";

import { View, Text, Picker } from "@tarojs/components";
import "./index.scss";

class SelMenu extends Component {
  static externalClasses = ["ext-cls"];

  range = 30;
  constructor(props) {
    super(props);
    let d = new Date();
    // const start = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
    d.setDate(d.getDate() + this.range);
    const start = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
    this.state = {
      start
    };
  }

  renderEmptyLabel = () => {
    return <View className="empty-label"></View>;
  };

  renderIcon = () => (
    <View className="at-icon at-icon-chevron-down icon"></View>
  );
  renderLabel = type => {
    const { zone, time, date, zones, times } = this.props;

    if (type == "zone") {
      return (
        <View className="label">
          {zone >= 1 ? zones[zone] : "目的地"}
          {this.renderIcon()}
        </View>
      );
    }

    if (type == "date") {
      return (
        <View className="label label-date">
          {!!date ? date : "时间"}
          {this.renderIcon()}
        </View>
      );
    }

    if (type == "time") {
      return (
        <View className="label">
          {time >= 0 ? times[time] : "出行时间"}
          {this.renderIcon()}
        </View>
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
    const { zones, times, date, show } = this.props;
    return (
      <View
        className="container ext-cls"
        style={{
          display: `${show ? "flex" : "none"}`
        }}
      >
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
          value={date}
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

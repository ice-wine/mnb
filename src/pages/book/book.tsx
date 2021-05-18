import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtInput, AtTextarea, AtIcon, AtModal } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "./book.scss";

export default class Book extends Component<any, any> {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      pageStatus: 1, // 1. 新建 2.查看 3.编辑};
      title: "", // 标题
      content: "", // 内容
      isShowModal: true,
      // 弹框
      modalEvent: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // 路由处理
    let routerParams = this.$instance.router.params;
    console.log("当前路由", routerParams);
    let barTitle = "新建";
    if (routerParams.hasOwnProperty("id")) {
      barTitle = "查看";
      this.setState({
        pageStatus: 2
      });
    }
    Taro.setNavigationBarTitle({
      title: `${barTitle}主题`
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = value => {
    this.setState({
      value
    });
    return value;
  };

  handleModalOpen = () => {
    console.log("handleModalOpen");
    this.setState({
      isShowModal: true
    });
  };

  handleModalClose = () => {
    console.log("handleModalClose");
    this.setState({
      isShowModal: false
    });
  };

  handleModalCancel = () => {
    console.log("handleModalCancel");
    this.setState({
      isShowModal: false
    });
  };
  handleModalConfirm = () => {
    console.log("handleModalConfirm");
    this.setState({
      isShowModal: false
    });
  };

  render() {
    return (
      <View className="book pall20">
        <View>
          <AtInput
            required
            title="主题"
            type="text"
            maxLength={50}
            placeholder="请输入主题"
            value={this.state.title}
            onChange={() => this.handleChange}
          />
          <AtInput
            title="内容"
            type="text"
            maxLength={300}
            placeholder="请输入内容"
            value={this.state.content}
            onChange={() => this.handleChange}
          />
        </View>
        <View className="flex justify-between mt20 pall20">
          <Text className="font-medium">记一记</Text>
          <AtIcon
            value="add-circle"
            size="30"
            className="primary"
            onClick={this.handleModalOpen}
          ></AtIcon>
        </View>
        <View className="font-small font-bold">
          <Text className="plr15 primary">合计：+2</Text>
          <Text className="plr15 green">成功：+1</Text>
          <Text className="plr15 gray">失败：-2</Text>
        </View>
        {/* 内容 */}
        <View className="mt40">
          <View className="time-line">
            <View className="time-item">
              <View className="time-icon"></View>
              <View className="time-content">
                <View className="gray">2020.02.03 12:12:11</View>
                今天坚持在公园跑步1小时
              </View>
              <View className="time-mark">+1</View>
            </View>
            <View className="time-item">
              <View className="time-icon"></View>
              <View className="time-content">
                <View className="gray">2020.02.03 12:12:11</View>
                今天在家躺尸 今天在家躺尸 今天在家躺尸 今天在家躺尸
              </View>
              <View className="time-mark">-10010010</View>
            </View>
          </View>
        </View>
        {/* 记事弹框 新建 & 编辑  */}
        <AtModal
          isOpened={this.state.isShowModal}
          onClose={this.handleModalClose}
          className="custom-modal"
        >
          <View className="modal-content">
            <AtTextarea
              maxLength={200}
              placeholder="请输入事宜"
              value={this.state.modalEvent}
              onChange={() => this.handleChange}
            />
          </View>
          <View className="modal-action">
            <View className="action-item" onClick={this.handleModalCancel}>
              取消
            </View>
            <View
              className="action-item primary"
              onClick={this.handleModalConfirm}
            >
              确定
            </View>
          </View>
        </AtModal>
      </View>
    );
  }
}

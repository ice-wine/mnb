import { Component } from "react";
import { View, Text } from "@tarojs/components";
import {
  AtInput,
  AtTextarea,
  AtIcon,
  AtModal,
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import WPicker from "../../components/wPicker/index";

import "./book.scss";

export default class Book extends Component<any, any> {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      pageStatus: 1, // 1. 新建 2.查看 3.编辑};
      bookTitle: "", // 标题
      bookContent: "", // 内容
      // 弹框
      isShowModal: true,
      modalEvent: "",
      modalType: 1,
      modalMark: "",
      modalTime: "",
      // 操作记录
      isShowAction: false,
      bookInfo: {}
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
    this.WPicker.show();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };

  handleMark = type => {
    // type:1.添加 2.减去
    console.log("handleMark");
    this.setState({
      modalType: type
    });
  };

  onTimeRef = ref => {
    this.WPicker = ref;
  };

  onTimeConfirm = (type, e) => {
    console.log(e);
  };

  onCancel = () => { };
  
  handleModalOpen = init => {
    console.log("handleModalOpen---init", init);
    // 新建
    this.setState({
      isShowModal: true,
      modalEvent: !init ? this.state.bookInfo.event || "" : "",
      modalType: !init ? this.state.bookInfo.markType || 1 : 1,
      modalMark: !init ? this.state.bookInfo.mark || "" : ""
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

  handleOpenBookAction = bookInfo => {
    console.log("handleModalDel", this.state.bookInfo);
    this.setState({
      isShowAction: true,
      bookInfo
    });
  };

  handleBookEdit = () => {
    console.log("编辑", this.state.bookInfo);
    this.setState({
      isShowAction: false
    });
    this.handleModalOpen(false);
  };

  handleBookDel = () => {
    console.log("删除", this.state.bookInfo);
    this.setState({
      isShowAction: false
    });
  };

  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
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
            name="bookTitle"
            value={this.state.bookTitle}
            onChange={this.handleChange.bind(this, "bookTitle")}
          />
          <AtInput
            title="内容"
            type="text"
            maxLength={300}
            placeholder="请输入内容"
            name="bookContent"
            value={this.state.bookContent}
            onChange={this.handleChange.bind(this, "bookContent")}
          />
        </View>
        <View className="flex justify-between mt20 pall20">
          <Text className="font-medium">记一记</Text>
          <AtIcon
            value="add-circle"
            size="30"
            className="primary"
            onClick={() => this.handleModalOpen(true)}
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
            <View
              className="time-item"
              onClick={() =>
                this.handleOpenBookAction({
                  bookId: 1,
                  event: "今天坚持在公园跑步1小时",
                  markType: 1,
                  mark: 1
                })
              }
            >
              <View className="time-icon"></View>
              <View className="time-content">
                <View className="gray">2020.02.03 12:12:11</View>
                今天坚持在公园跑步1小时
              </View>
              <View className="time-mark">+1</View>
            </View>
            <View
              className="time-item"
              onClick={() =>
                this.handleOpenBookAction({
                  bookId: 2,
                  event: "今天在家躺尸",
                  markType: 2,
                  mark: 10010010
                })
              }
            >
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
              onChange={this.handleChange.bind(this, "modalEvent")}
            />
            <View className="mt20 flex align-items-center">
              <View>
                <AtIcon
                  value="add-circle"
                  size="30"
                  className={this.state.modalType == 1 ? "primary" : "grey"}
                  onClick={() => this.handleMark(1)}
                ></AtIcon>
                <AtIcon
                  value="subtract-circle"
                  size="30"
                  className={this.state.modalType == 2 ? "primary" : "grey"}
                  onClick={() => this.handleMark(2)}
                ></AtIcon>
              </View>
              <View className="flex-1">
                <AtInput
                  name="modalMark"
                  type="number"
                  placeholder="请输入分值"
                  value={this.state.modalMark}
                  onChange={this.handleChange.bind(this, "modalMark")}
                />
              </View>
              <View>{this.state.modalTime}</View>
            </View>
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
        {/* 操作记录 */}
        <AtActionSheet
          isOpened={this.state.isShowAction}
          cancelText="取消"
          onClose={() => this.setState({ isShowAction: false })}
        >
          <AtActionSheetItem className="primary" onClick={this.handleBookEdit}>
            编辑
          </AtActionSheetItem>
          <AtActionSheetItem className="danger" onClick={this.handleBookDel}>
            删除
          </AtActionSheetItem>
        </AtActionSheet>
        {/* 选择时间 */}
        <View>
          <WPicker
            mode="date"
            startYear="2021"
            endYear="2031"
            current={true}
            fields="second"
            confirm={this.onTimeConfirm.bind(this, "modalTime")}
            cancel={this.onCancel}
            disabledAfter={false}
            onRef={this.onTimeRef}
          ></WPicker>
        </View>
      </View>
    );
  }
}

import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtModal, AtInput } from "taro-ui";

export default class bookPop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // 弹框
      isShowModal: false,
      modalBookId: "",
      modalBookTitle: "", // 标题
      modalBookContent: "" // 内容
    };
  }

  componentWillMount() {
    this.props.onRef(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 输入赋值
  handleChange = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };

  openBookPop = () => {
    console.log("openBookPop", this.props);
    this.setState({
      isShowModal: true,
      modalBookId: this.props.bookInfo ? this.props.bookInfo.id || "" : "",
      modalBookTitle: this.props.bookInfo
        ? this.props.bookInfo.title || ""
        : "",
      modalBookContent: this.props.bookInfo
        ? this.props.bookInfo.content || ""
        : ""
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

  checkModalParams = () => {
    if (!this.state.modalBookTitle) {
      Taro.showToast({
        title: "请输入主题~"
      });
      return false;
    }
    return true;
  };

  handleModalConfirm = () => {
    console.log("handleModalConfirm");
    if (!this.checkModalParams()) return;
    this.postBookInfo();
    this.setState({
      isShowModal: false
    });
  };

  postBookInfo = () => {
    // 判断 modalBookId
    Taro.showToast({
      title: "提交成功", // 提交失败
      icon: "success" // none
    });
  };

  render() {
    return (
      <View className="book-pop">
        {/*  主题弹框 新建 & 编辑  */}
        <AtModal
          isOpened={this.state.isShowModal}
          onClose={this.handleModalClose}
          className="custom-modal"
        >
          <View className="modal-content">
            <AtInput
              required
              title="主题"
              type="text"
              maxLength={50}
              placeholder="请输入主题"
              name="bookTitle"
              value={this.state.modalBookTitle}
              onChange={this.handleChange.bind(this, "modalBookTitle")}
            />
            <AtInput
              title="内容"
              type="text"
              maxLength={300}
              placeholder="请输入内容"
              name="bookContent"
              value={this.state.modalBookContent}
              onChange={this.handleChange.bind(this, "modalBookContent")}
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

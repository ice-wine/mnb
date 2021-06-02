import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtFab } from "taro-ui";
import BookPop from "../components/bookPop/index";

import "./index.scss";
export default class Index extends Component<any, any> {
  BookPop = null;

  constructor(props) {
    super(props);
    this.state = {
      bookList: [
        {
          id: 1,
          title: "新模板"
        }
      ]
    };
  }

  componentWillMount() {}

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
  // 主题详情页
  goBookView(id) {
    // 主题详情（区分 新建 & 查看）
    let bookUrl = `/pages/book/book?id=${id}`;
    Taro.navigateTo({
      url: bookUrl
    });
  }

  // 新建主题
  addBookView = () => {
    console.log("addBookView", this.BookPop);
    this.BookPop.openBookPop();
  };

  onBookPopRef = ref => {
    this.BookPop = ref;
  };

  // 获取所有主题
  getBookList = () => {};

  render() {
    return (
      <View className="index">
        <View className="book-content">
          {this.state.bookList.map(item => {
            return (
              <View
                className="content-item"
                onClick={() => this.goBookView(item.id)}
                style="background-color:'#ff0000'"
              >
                {item.title}
              </View>
            );
          })}
        </View>
        <AtFab className="add-book" onClick={() => this.addBookView()}>
          <Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
        <BookPop onRef={this.onBookPopRef}></BookPop>
      </View>
    );
  }
}

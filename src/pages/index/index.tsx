import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.scss'
export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goBookView(id) {
    // 主题详情（区分 新建 & 查看）
    let bookUrl = `/pages/book/book`
    if (id) bookUrl = bookUrl + `?id=${id}`
    Taro.navigateTo({
      url: bookUrl
    })
  }

  render() {
    return (
      <View className='index'>
        <View className='book-content'>
          <View className='content-item' onClick={() => this.goBookView(1)}>
            设立一个小目标，优秀优秀优秀
          </View>
          <View className='content-item'>嘻嘻</View>
          <View className='content-item'>AAAAAAAAAAAAAAAAAAAAAAAAAA</View>
          <View className='content-item'>奥术大师大所大所多撒大所sadasdasdas</View>
          <View className='content-item'>嘻嘻1</View>
        </View>
        <AtFab className='add-book' onClick={() => this.goBookView(null)}>
          <Text className='at-fab__icon at-icon at-icon-add'></Text>
        </AtFab>
      </View>
    )
  }
}

import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import './book.scss'

export default class Book extends Component<any, any> {
  $instance = getCurrentInstance()

  constructor(props) {
    super(props);
    this.state = {
      pageStatus: 1,// 1. 新建 2.查看 3.编辑};
      title: '', // 标题
      content: '' // 内容
    }
  }

  componentWillMount() { }

  componentDidMount() {
    // 路由处理
    let routerParams = this.$instance.router.params
    console.log('当前路由', routerParams)
    let barTitle = '新建'
    if (routerParams.hasOwnProperty('id')) {
      barTitle = '查看';
      this.setState({
        pageStatus: 2
      })
    }
    Taro.setNavigationBarTitle({
      title: `${barTitle}主题`
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleChange = (value) => {
    this.setState({
      value
    })
    return value
  }

  render() {
    const { pageStatus } = this.state
    return (
      <View className='book pall20'>
        <View>
          <AtInput
            required
            name='value'
            title='主题'
            type='text'
            maxLength='50'
            placeholder='请输入主题'
            value={this.state.title}
            onChange={() => this.handleChange}
          />
          <AtInput
            name='value'
            title='内容'
            type='text'
            maxLength='300'
            placeholder='请输入内容'
            value={this.state.content}
            onChange={() => this.handleChange}
          />
        </View>
        <View className='flex justify-between mt20 pall20'>
          <Text className='font-medium'>记一记</Text>
          <AtIcon value='add-circle' size='30' className='primary'></AtIcon>
        </View>
      </View>
    )
  }
}

import { Component } from 'react'
import './app.scss'
import './assets/style/mixin.scss'
class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    return this.props.children
  }
}

export default App

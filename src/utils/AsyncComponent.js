import React, { Component } from "react"

export default function asyncComponent(dynamicImportComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      dynamicImportComponent().then((mod) => {
        this.setState({
          component: mod.default
        })
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}
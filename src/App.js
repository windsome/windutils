import React, { Component } from 'react';

import loadJs from './lib/loadScript';
import sleep from './lib/sleep';
import rdebug from './lib/remoteDebug';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  testSleep() {
    this.setState({testSleep: {...(this.state.testSleep || {}), fetching: true}})
    sleep(2000).then(ret => {
      this.setState({testSleep: {...(this.state.testSleep || {}), fetching: false, msg: '休眠完成'}})
    })
  }
  renderTestSleep() {
    return (
      <div>
        <div onClick={this.testSleep.bind(this)}>开始睡眠</div>
        <div>{JSON.stringify(this.state.testSleep||{})}</div>
      </div>
    )
  }

  testApisRemoteDebug() {
    this.setState({apisRemoteDebug: {...(this.state.apisRemoteDebug || {}), fetching: true}})
    rdebug({test:1}).then(ret => {
      this.setState({apisRemoteDebug: {...(this.state.apisRemoteDebug || {}), fetching: false, msg: '已休眠1秒'}})
    }).catch(error => {
      this.setState({apisRemoteDebug: {...(this.state.apisRemoteDebug || {}), fetching: false, msg: error.message}})
    })
  }
  renderApisRemoteDebug() {
    return (
      <div>
        <div onClick={this.testApisRemoteDebug.bind(this)}>测试远程调试</div>
        <div>{JSON.stringify(this.state.apisRemoteDebug||{})}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          <span style={{padding:5, margin: 5, backgroundColor:(this.state.test === 'sleep')?'#ff0':'#fff'}} onClick={()=>this.setState({test: 'sleep'})}> TestSleep </span>
          <span style={{padding:5, margin: 5, backgroundColor:(this.state.test === 'apisRemoteDebug')?'#ff0':'#fff'}} onClick={()=>this.setState({test: 'apisRemoteDebug'})}> apisRemoteDebug </span>
        </div>
        <div>
          {this.state.test === 'sleep' &&
          this.renderTestSleep()
          }
          {this.state.test === 'apisRemoteDebug' &&
          this.renderApisRemoteDebug()
          }
        </div>
      </div>
    );
  }
}

export default App;

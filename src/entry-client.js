import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {loadableReady} from "@loadable/component";
import createStore from "./redux/store";
// import Root from "./App";
import Page from './router';

const createApp = (Component) => {
  // 获取服务端初始化的state，创建store
  const initialState = window.__INITIAL_STATE__;
  const store = createStore(initialState);

  return (
    <Provider store={store}>
      <Component store={store}></Component>
    </Provider>
  );

  /*const App = () => {
    return (
      <Provider store={store}>
        <Component store={store}></Component>
      </Provider>
    );
  };
  return <App/>;*/
};

// 开始渲染之前加载所需的组件
loadableReady().then(() => {
  ReactDOM.hydrate(createApp(Page), document.getElementById('root'));
});

// 热更新
if (module.hot) {
  module.hot.accept("./App", () => {
    // const NewApp = require("./App").default;
    ReactDOM.hydrate(createApp(Page), document.getElementById('root'));
  });
}

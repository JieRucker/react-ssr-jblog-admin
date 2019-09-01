import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// import {compose} from "redux/index";
// import thunk from "redux-thunk/index";

// 导出函数，以便客户端和服务端根据初始state创建store
/*export default (store) => {
  return createStore(
    reducer,
    store,
    applyMiddleware(thunk) // 允许store能dispatch函数
  );
}*/

export default (store) => {
  return createStore(reducers, store, compose(
    applyMiddleware(thunk), window.devToolsExtension ?
      window.devToolsExtension() :
      f => f
  ));
}

import React from "react";
// import {StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
import createStore from "./redux/store";
import {routers} from "./router/routers";
import Page from './router';

// import Root from "./App";

const createApp = (context, url, store) => {
  /*const App = () => {
    return (
      <Provider store={store}>
        <StaticRouter context={context} location={url}>
        </StaticRouter>
      </Provider>
    )
  };
  return <App/>;*/

  return (
    <Provider store={store}>
      <Page store={store}/>
    </Provider>
  )
};

export {
  createApp,
  createStore,
  routers
};

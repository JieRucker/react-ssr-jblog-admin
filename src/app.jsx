import React from "react";
import {
    Switch,
    Redirect,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
// import {Helmet} from "react-helmet";

import AuthRouter from './components/auth/AuthRouter';
import Login from './views/login/login';
import Register from './views/login/register';
import Index from './views/layout';
import NotFound from './views/404/notFound';
import 'antd/dist/antd.css';
import "./assets/app.css";

class App extends React.Component {

    render() {
        return (
            <div style={{height: '100%'}}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app/article/list" push/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <AuthRouter path='/app' component={Index}></AuthRouter>
                    <Route path='/404' component={NotFound}/>
                    <Redirect from='*' to='/404'/>
                </Switch>
            </div>

            // <div>
            //     <Helmet>
            //         <meta name="keywords" content="React SSR"></meta>
            //     </Helmet>
            //     <div className="view">
            //         <Switch>
            //             {
            //                 router.map((route, i) =>
            //                     <Route key={i} path={route.path} exact={route.exact}
            //                         /*渲染路由对应的视图组件，将路由组件的props传递给视图组件*/
            //                            render={(props) =>
            //                                <route.component {...props} router={route.routes}/>
            //                            }
            //                     />
            //                 )
            //             }
            //
            //             <Redirect from="/" to="/bar" exact/>
            //
            //             <Route render={({staticContext}) => {
            //                 if (staticContext) {
            //                     staticContext.statusCode = 404;
            //                 }
            //                 return <div>
            //                     <h1>Not Found</h1>
            //                 </div>;
            //             }}/>
            //
            //         </Switch>
            //     </div>
            // </div>
        );
    }
}

export default App;

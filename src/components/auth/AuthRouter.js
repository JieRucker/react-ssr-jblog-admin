/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/5/28 17:28
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/5/28 17:28
 */

import React, {Component} from 'react'
import {withRouter, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

@withRouter
class AuthRouter extends Component {
    render() {
        const {component: Component, ...rest} = this.props;
        let cookie = Cookies.get('token');
        let REACT_ENV = process.env.REACT_ENV;

        return (
            <Route {...rest} render={props => {

                if (REACT_ENV === 'client') {
                    return cookie
                        ? <Component {...props} />
                        : <Redirect to="/login"/>
                } else {
                    return <Component {...props} />
                }

            }}/>
        )
    }
}

export default AuthRouter;

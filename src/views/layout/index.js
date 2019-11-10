import React, {Component} from 'react'
import {Layout} from 'antd'
import {
    Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import SiderCustom from './sider/siderCustom'
import HeaderCustom from './header/headerCustom'
import {router} from '../../router';
import {loginOut, initUserInfo} from '../../redux/user/user.redux'
import {initOpenMenu, siderOpenChange} from '../../redux/sider/sider.redux'
import './index.css'

const {Content, Footer} = Layout;

const mapStateToProps = (state) => ({
    user: state.user,
    sider: state.sider
});

const mapDispatchToProps = (dispatch) => ({
    loginOut, initUserInfo,
    initOpenMenu, siderOpenChange
});

@connect(
    mapStateToProps,
    mapDispatchToProps()
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            hidden: true
        };
    }

    UNSAFE_componentWillMount() {
        this.props.initUserInfo(); // 初始化用户信息
        if (process.env.REACT_ENV === "client") {
            this.props.initOpenMenu();
        }
    }

    componentDidMount() {
        /*setTimeout(() => {
            this.setState(prevState => ({hidden: !prevState}))
        }, 100)*/
    }

    loginOut = () => {
        this.props.loginOut();
        this.props.history.push('/login')
    };

    toggle = () => {
        this.setState(prevState => ({collapsed: !prevState.collapsed}))
    };

    siderOpenChange = (payload) => {
        this.props.siderOpenChange(payload)
    };

    render() {

        const renderRouteFn = () => {
            return router.map(({path, title, component: Component, ...props}) => (
                <Route key={title}
                       exact
                       path={path}
                       render={(props) => <Component {...props}/>}
                       {...props}
                />
            ))
        };

        const renderRoute = renderRouteFn();

        return (
            <div className="container">
                <Layout>
                    <SiderCustom
                        collapsed={this.state.collapsed}
                        defaultOpenKeys={this.props.sider.openKeys}
                        siderOpenChange={this.siderOpenChange}
                    >
                    </SiderCustom>
                    <Layout>
                        <HeaderCustom
                            collapsed={this.state.collapsed}
                            toggle={this.toggle}
                            loginOut={this.loginOut}
                            name={this.props.user.admin_name}
                        >
                        </HeaderCustom>
                        <Content style={{
                            margin: '10px',
                            padding: 10,
                            background: '#fff',
                            overflow: 'initial',
                            minHeight: 'initial'
                        }}>
                            {
                                process.env.REACT_ENV === "client" ?
                                    Cookies.get('token') ?
                                        renderRoute : null :
                                    renderRoute
                            }
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Copyright © J.Rucker 2018
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index

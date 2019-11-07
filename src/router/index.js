// import {fatchTopList, fetchTopDetail} from "../redux/actions";
import {getArticleList} from "../redux/article/list.redux";

import loadable from "@loadable/component";

// 不显示在菜单路由里
export const otherRouter = [
    {
        title: '编辑文章',
        path: '/app/article/edit/:id',
        component: loadable(() => import('../views/article/edit'))
    },
    {
        title: '编辑作品',
        path: '/app/works/edit/:id',
        component: loadable(() => import('../views/works/edit'))
    },
];

// 显示在菜单路由里
export const appRouter = [
    {
        path: '/app/article',
        title: '文章',
        icon: 'exception',
        sub: [{
            path: '/app/article/list',
            title: '文章列表',
            icon: '',
            component: loadable(() => import('../views/article/list')),
            asyncData(store) {
                return store.dispatch(getArticleList({
                    keyword: '',
                    tag: '',
                    state: '',
                    current_page: 1,
                    page_size: 10
                }));
            }
        }, {
            path: '/app/article/new',
            title: '写文章',
            icon: '',
            component: loadable(() => import('../views/article/new'))
        }],
    },
    {
        path: '/app/tag',
        title: '标签',
        icon: 'exception',
        sub: [{
            path: '/app/tag/list',
            title: '标签列表',
            icon: '',
            component: loadable(() => import('../views/tag/list'))
        }],
    },
    {
        path: '/app/work',
        title: '作品',
        icon: 'exception',
        sub: [{
            path: '/app/works/list',
            title: '作品列表',
            icon: '',
            component: loadable(() => import('../views/works/list'))
        }, {
            path: '/app/works/new',
            title: '写作品',
            icon: '',
            component: loadable(() => import('../views/works/new'))
        }],
    },
    {
        path: '/app/upload',
        title: '上传',
        icon: 'upload',
        sub: [{
            path: '/app/upload/list',
            title: '文件列表',
            icon: '',
            component: loadable(() => import('../views/upload/upload'))
        }],
    },
    {
        path: '/app/setting',
        title: '设置',
        icon: 'setting',
        sub: [{
            path: '/app/setting/mine',
            title: '个人信息',
            icon: '',
            component: loadable(() => import('../views/setting/mine'))
        }, {
            path: '/app/setting/upyun',
            title: '又拍云',
            icon: '',
            component: loadable(() => import('../views/setting/upyun'))
        }, {
            path: '/app/setting/about',
            title: '关于',
            icon: '',
            component: loadable(() => import('../views/setting/about'))
        }],
    }
];

export const appRouterMethod = (() => {
    let routes = [];

    return () => {
        appRouter.forEach(item => {
            item.component && routes.push(item);

            if (item.sub && item.sub.length)
                item.sub.map(sub => routes.push(sub))
        });

        return routes
    }
})();

const router = [
    ...otherRouter,
    ...appRouterMethod(),
    /*
    {
        path: "/foo",
        component: loadable(() => import("../views/Foo"))
    },
    {
        path: "/top-list",
        component: loadable(() => import("../containers/TopList")),
        exact: true,
        asyncData(store) {
            return store.dispatch(fatchTopList());
        }
    },
    {
        path: "/top-list/:id",
        component: loadable(() => import("../containers/TopDetail")),
        asyncData(store, params) {
            return store.dispatch(fetchTopDetail(params.id));
        }
    }*/
];

export {
    router,
}

import dynamic from 'dva/dynamic';


export const getNavData = app => [
  {
    component: dynamic({app, component: () => import('../layouts/UserLayout')}),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        isHide:true,
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamic({app,models: () => [
              import('../models/login'),
            ], component: () => import('../routes/User/Login')}),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamic({app, models: () => [
              import('../models/register'),
            ], component: () => import('../routes/User/Register')}),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamic({app, component: () => import('../routes/User/RegisterResult')}),
          },
        ],
      },
    ],
  },
  {
    component: dynamic({
      app,
      models: () => [
        import('../models/user'),
      ],
      component: () => import('../layouts/BasicLayout'),
    }),
    layout: 'BasicLayout',
    name: '科室首页', // for breadcrumb
    path: '/',
    children: [{
      name: '科室首页',
      icon: 'edit',
      path: 'index',
      children: [{
        name: '最新动态',
        path: 'news',
        component: dynamic({
          app,
          models: () => [
            import('../models/rule'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }, {
        name: '学术会议',
        path: 'monitor',
        component: dynamic({
          app,
          models: () => [
            import('../models/monitor'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }, {
        name: '研究课题',
        path: 'xxxxxx',
        component: dynamic({
          app,
          models: () => [
            import('../models/project'),
            import('../models/activities'),
            import('../models/chart'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }, {
        name: '首页轮播',
        path: 'workplace',
        component: dynamic({
          app,
          models: () => [
            import('../models/project'),
            import('../models/activities'),
            import('../models/chart'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }
    ],
    }, {
      name: '科室团队',
      path: 'form',
      icon: 'form',
      children: [{
        name: '科室管理',
        path: 'basic-form',
        component: dynamic({
          app,
          models: () => [
            import('../models/form'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }, {
        name: '医生管理',
        path: 'step-form',
        component: dynamic({
          app,
          models: () => [
            import('../models/form'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }],
    }, {
      name: '科普宣教',
      path: 'list',
      icon: 'table',
      children: [{
        name: '分类管理',
        path: 'table-list',
        component: dynamic({
          app,
          models: () => [
            import('../models/rule'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }, {
        name: '文章管理',
        path: 'basic-list',
        component: dynamic({
          app,
          models: () => [
            import('../models/list'),
          ],
          component: () => import('../routes/Index/News'),
        }),
      }],
    }, {
      name: '问题库',
      path: 'profile',
      icon: 'profile',
      component: dynamic({
        app,
        models: () => [
          import('../models/profile'),
        ],
        component: () => import('../routes/Index/News'),
      }),
    }, {
      name: '咨询历史',
      path: 'xxx',
      icon: 'profile',
      component: dynamic({
        app,
        models: () => [
          import('../models/profile'),
        ],
        component: () => import('../routes/Index/News'),
      }),
    }, {
      name: '热门咨询',
      path: 'ddd',
      icon: 'profile',
      component: dynamic({
        app,
        models: () => [
          import('../models/profile'),
        ],
        component: () => import('../routes/Index/News'),
      }),
    }, {
      name: '用户管理',
      path: 'result',
      icon: 'check-circle-o',
      children: [{
        name: '患者',
        path: 'success',
        component: dynamic({
          app,
          component: () => import('../routes/Result/Success'),
        }),
      }, {
        name: '医学助理',
        path: 'fail',
        component: dynamic({
          app,
          component: () => import('../routes/Result/Error'),
        }),
      }, {
        name: '医生',
        path: 'ccc',
        component: dynamic({
          app,
          component: () => import('../routes/Result/Error'),
        }),
      }],
    }, {
      name: '服务记录',
      path: 'exception',
      icon: 'warning',
      component: dynamic({
        app,
        component: () => import('../routes/Exception/403'),
      }),
    }],
  }, 
];

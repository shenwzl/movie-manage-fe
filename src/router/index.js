import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // redirect: '/',
    meta: {
      title: '项目管理',
      icon: 'chart'
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/projects/index'),
        meta: { title: '项目基本信息', icon: 'dashboard' },
      },
      {
        path: '/search',
        component: () => import('@/views/projects/search'),
        meta: { title: '项目信息', icon: 'dashboard' }
      },
      // {
      //   path: ''
      // },
      {
        path: 'add',
        component: () => import('@/views/projects/add'),
        meta: { title: '新建', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'edit/:projectId',
        component: () => import('@/views/projects/edit'),
        meta: { title: '编辑', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'detail/:projectId',
        component: () => import('@/views/projects/detail'),
        meta: { title: '查看', icon: 'dashboard' },
        hidden: true
      }
    ]
  },

  {
    path: '/config',
    component: Layout,
    meta: { title: '项目配置管理', icon: 'guide' },
    children: [
      {
        path: 'staff',
        component: () => import('@/views/config/staff'),
        name: '员工管理',
        meta: { title: '员工管理', icon: 'guide', noCache: true }
      },
      {
        path: 'contract',
        component: () => import('@/views/config/contract'),
        name: '合同主体管理',
        meta: { title: '合同主体管理', icon: 'guide', noCache: true }
      },
      {
        path: 'provider',
        component: () => import('@/views/config/provider'),
        name: '供应商管理',
        meta: { title: '供应商管理', icon: 'guide', noCache: true }
      },
      {
        path: 'fee',
        component: () => import('@/views/config/fee'),
        name: '费用项管理',
        meta: { title: '费用项管理', icon: 'guide', noCache: true }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: '用户管理',
        meta: { title: '用户管理', icon: 'guide', noCache: true }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '权限管理', noCache: true, icon: 'guide' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/index'),
        name: '权限管理',
        meta: { title: '权限管理', icon: 'guide', noCache: true }
      },
      {
        path: 'roles',
        component: () => import('@/views/permission/roles'),
        name: '角色管理',
        meta: { title: '角色管理', icon: 'guide', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

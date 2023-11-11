import { createRouter, createWebHistory } from 'vue-router'

import routerConfig from '@/plugins/router'
import { getCookie } from '@/plugins/cookies'

const { dashboard, auth, notFound } = routerConfig
const { event, activity, activityType, home } = dashboard
const { login, signup, personalInfo } = auth

const routes = [
  {
    path: home.path,
    name: home.name,
    component: () => import('@/views/dashboard/TheHomeView.vue'),
    meta: {
      requiresAuth: true,
      title: home.title
    }
  },
  {
    path: event.path,
    name: event.name,
    component: () => import('@/views/dashboard/TheEventView.vue'),
    meta: {
      requiresAuth: true,
      title: event.title
    }
  },
  {
    path: activity.path,
    name: activity.name,
    component: () => import('@/views/dashboard/TheActivityView.vue'),
    meta: {
      requiresAuth: true,
      title: activity.title
    }
  },
  {
    path: activityType.path,
    name: activityType.name,
    component: () => import('@/views/dashboard/TheActivityTypeView.vue'),
    meta: {
      requiresAuth: true,
      title: activityType.title
    }
  },
  {
    path: signup.path,
    name: signup.name,
    component: () => import('@/views/auth/TheSignupView.vue'),
    meta: {
      title: signup.title
    }
  },
  {
    path: personalInfo.path,
    name: personalInfo.name,
    component: () => import('@/views/auth/ThePersonalInfoView.vue'),
    meta: {
      title: personalInfo.title
    }
  },
  {
    path: login.path,
    name: login.name,
    component: () => import('@/views/auth/TheLoginView.vue'),
    meta: {
      title: login.title
    }
  },
  {
    path: notFound.path,
    name: notFound.name,
    component: () => import('@/views/dashboard/TheNotFoundView.vue'),
    meta: {
      title: notFound.title
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: notFound.path
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  setDocumentTitle(to)

  handleAuthentication(to, next)
})

const setDocumentTitle = (to) => {
  const title = to.meta.title
  if (title) document.title = title
}

const handleAuthentication = (to, next) => {
  if (to.meta.requiresAuth) {
    if (!!getCookie()) {
      next()
    } else {
      next({ name: login.name })
    }
  } else {
    next()
  }
}

export default router

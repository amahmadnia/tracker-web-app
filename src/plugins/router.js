export default {
  dashboard: {
    name: 'dashboard',
    path: '/',

    home: {
      name: 'home',
      path: '/',
      title: 'صفحه اصلی'
    },
    event: {
      name: 'events',
      path: '/events',
      title: 'رویدادها'
    },
    activity: {
      name: 'activities',
      path: '/activities',
      title: 'فعالیت ها'
    },
    activityType: {
      name: 'activity-types',
      path: '/activity-types',
      title: 'نوع فعالیت ها'
    }
  },
  auth: {
    name: 'auth',
    path: '/auth',

    login: {
      name: 'login',
      path: '/login',
      title: 'ورود'
    },
    signup: {
      name: 'signup',
      path: '/signup',
      title: 'ثبت نام'
    },
    personalInfo: {
      name: 'personal-info',
      path: '/personal-info',
      title: 'اطلاعات فردی'
    }
  },
  notFound: {
    name: '404',
    path: '/404',
    title: 'Not FOund'
  }
}

const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: '/:nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/change-password',
  purchaseHistory: '/user/purchase-history'
} as const

export default path
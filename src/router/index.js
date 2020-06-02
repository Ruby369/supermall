import Vue from 'vue'
import VueRouter from 'vue-router'

// const Cart = () => import('../views/cart/Cart')
// const Category = () => import('../views/category/Category')
// const Home = () => import('../views/home/Home')
// const Profile = () => import('../views/profile/Profile')

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      // component:Home
      component:() => import('views/home/Home'),

    },
    {
      path:'/cart',
      // component:Cart
      component:() => import('views/cart/Cart')

    },
    {
      path:'/category',
      // component:Category
      component:() => import('views/category/Category')

    },
    {
      path:'/profile',
      // component:Profile
      component:() => import('views/profile/Profile')

    },
    {
      path:'/detail/:iid',
      // component:Profile
      component:() => import('views/detail/Detail')
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

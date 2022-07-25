// 普通加载路由 
import video2 from './video2.vue'
// 路由懒加载 
const video2 = () =>import('./video2.vue')
export default{
    path:'video2',
    name:'video2',
    component:video2
    children:[
    ]
}
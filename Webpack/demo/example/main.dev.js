// import app, { coreRoutes } from '../src/index.js'
// // import 'font-awesome/css/font-awesome.css'

// // console.log(coreRoutes);
// // console.log(app);
// //挂载框架
// app.mount({ routes: coreRoutes })

// app.start().then(() => {
//   console.log("Vue is started.")
// });





import Vue from 'vue'
import App from './App.vue'

// import 'font-awesome/css/font-awesome.css'



// // import 'font-awesome-webpack' 

// import coreindex from '../src/index'
// Vue.use(coreindex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import router from './router';
import App from '../src/components/HelloWorld.vue'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
function createApp(options) {
  const app = new Vue({
    name: 'App',
    router,
    render: h => h(App, { props: options })
  })

  return { app, router }
}


export async function cusRender(url, options, renderToString) {
  // Pass in data related stuffs
  const { app, router } = createApp(options)

  return new Promise((resolve)=>{
    // set the router to the desired URL before rendering
    router.replace({
      path: url,
    })    
    router.onReady(()=>{
      renderToString(app).then((html)=>{
          resolve(html)
      })
    })
  })
}
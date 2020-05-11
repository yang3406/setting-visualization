import dvReport from './components/index.vue'

const install = (Vue) => {
  Vue.component(dvReport.name, dvReport)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(Window.Vue)
}

export {
  install,
  dvReport
}
export default dvReport;

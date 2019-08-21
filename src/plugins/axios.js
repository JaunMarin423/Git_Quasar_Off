import axios from 'axios'

export default ({ Vue }) => {
  let baseURL = null;
  if (process.env.__ENV__ === 'dev') {
    baseURL = 'https://f48151cd.ngrok.io/CP-VisitadorMedico_SLIM/public'
  } else if (process.env.__ENV__ === 'production') {
    baseURL = 'PRODUCTION URL'
  } else {
    baseURL = 'QA URL'
  }

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}

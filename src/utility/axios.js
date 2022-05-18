import axios from 'axios'
let baseURL
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = process.env.REACT_APP_DEV_API_URL
} else {
  baseURL = process.env.REACT_APP_PRO_API_URL
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = baseURL
    config.headers.authorization = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axios

import axios, { AxiosRequestConfig } from 'axios'

const serializeParams = (params: any[]): string => {
    const arr: string[] = []
    for (let [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach((e) => {
                arr.push(`${key}=${e}`)
            })
        } else {
            arr.push(`${key}=${value}`)
        }
    }
    return '?' + arr.join('&')
}

axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        config.method = (config.method || 'GET').toUpperCase() as AxiosRequestConfig['method']
        const request = uni.request({
            url: `${config.url}${config.params ? serializeParams(config.params) : ''}`,
            method: config.method as RequestOptions['method'],
            data: config.data,
            header: config.headers,
            success: (res) => {
                resolve({
                    status: res.statusCode || 0,
                    statusText: '',
                    data: res.data,
                    headers: res.header,
                    config: config,
                    request: request
                })
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
    // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
instance.interceptors.request.use(
    (config) => {
        // 请求预处理
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
instance.interceptors.response.use(
    (res) => {
        // 结果预处理
        return res
    },
    (err) => {
        uni.showToast({
            title: err.message,
            icon: 'none',
            duration: 5 * 1000
        })
        return Promise.reject(err)
    }
)

export default instance

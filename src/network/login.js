import axios from 'axios'

export function login(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
            timeout: 5000
        })

        instance.interceptors.response.use(res => {
            return res.data
        })

        instance(options)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}

export function loginhttp(form) {
    return login({
        url: 'login',
        params:form
    })
}

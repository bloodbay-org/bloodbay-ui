const PROD_API = 'https://api.bloodbay.org'
const DEV_API = 'http://127.0.0.1:8080'

export const getAPIUrl = () => {
    return process.env.NODE_ENV === 'development' ? DEV_API : PROD_API
}
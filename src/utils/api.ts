import axios from "axios"

const base = document.getElementById('baseurl')

export const Api = axios.create({
    baseURL: base?.getAttribute('href') || '',
    headers: { typeiforthsistemas: 'VM10V2MXVLDVALZSYKZAWFDUB3DPUT09' },
    timeout: 20000
})

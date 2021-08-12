import axios from '../axios.js'
export default{
    login(data){
        return axios({
            url:'/login/cellphone'+'?timestamp='+new Date().getTime(),
            method:'POST',
            data
        })
    }
}
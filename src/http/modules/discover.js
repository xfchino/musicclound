import axios from '../axios'
export default{
    banner(params){
        return axios({
            url:'/banner?type=0',
            params
        })
    },
    // 推荐歌单
    personalized(params){
        return axios({
            url:'/personalized',
            params
        })
    }
}
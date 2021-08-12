import axios from '../axios.js'
export default{
    // 根据id获取单个歌曲
    getOneSong(params){
        return axios({
            url:'/song/url',
            params
        })
    },
    // 搜索获取多个歌曲
    getListSong(params){
        return axios({
            url:'/cloudsearch',
            params
        })
    },
    // 搜搜歌手
    searchMultimatch(params){
        return axios({
            url:'/search/multimatch',
            params
        })
    },
    //搜索建议
    getSearchSuggest(params){
        return axios({
            url:'/search/suggest',
            params
        })
    },
    // 获取热搜
    getHotSearch(params){
        return axios({
            url:'/search/hot/detail',
            params
        })
    }
}
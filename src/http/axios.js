import axios from 'axios'
const instance=axios.create({
    //基本设置
    // baseURL:'/api',
    baseURL:'http://zyzbb.art:4000',
    timeout:3000,
    
})
//请求拦截
instance.interceptors.request.use(config=>{
    return config
},err=>{

})
//响应拦截
instance.interceptors.response.use(config=>{
    return config.data
},(err)=>{
    if(err&&err.response&&err.response.status){
        switch(err.response.status){
            case 401:
                err.message='身份认证过期';
                // Message.error('身份认证过期,请登录');
                router.push('/login');
                break;
            case 404:
                err.message='资源找不到';
                break;
            case 500:
                err.message='服务器错误';
                break;
            default:
                err.message='服务器错误';
                break;
            }
        }else{
            err.message = '服务器错误';
        }
        return Promise.reject(err.message);
})
export default instance
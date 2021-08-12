// 计算音乐时长,因为返回的毫秒
export function computeMusicTime(time){
    time=parseInt(time);
    if(time>10000){
        time=Math.floor(time/1000);//转换为秒
    }else{
        time=Math.floor(time);
    }
    let m=Math.floor(time/60);
    let s=Math.floor(time%60);
    m=m<10? '0'+m:m;
    s=s<10? '0'+s:s;
    return m+':'+s
}
// 把播放时长转换为秒
export function convertSecond(time){
    time=time.split(":");
    return parseInt(time[0])*60+parseInt(time[1]);
}
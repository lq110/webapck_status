import '@/styles/common.scss'
import '@/styles/pro_common.scss'



console.log('打包')
let p = new Promise(() => {
    let data = 10;
    let arr = [1, 2, 3, 4, 4];
    console.log( data ?? 0 )
    console.log([...arr])
    fetch('/').then(res => res.json()).then(res => {
        console.log(res)
    })
    setTimeout(() => {
        resolve('成功')
    }, 2000);
})

p.then(res=>{
    console.log('状态',res)
})
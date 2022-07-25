const { promisify } = require('util')

const {vueRepo} = require('../config/repo-config')
const download =promisify(require('download-git-repo'))
const {commandSpawn} = require('../utils/terminal')
const open = require('open')
const {compile,writeToFile,createDirSync} = require('../utils/utils')
const path = require('path')

// 这里的project,是从create中传入的项目的名称project
const creatActions = async (project)=>{
    console.log('----------yuxi help you create your project ...--------------');
    // 1.clone项目
    await download(vueRepo,project,{clone:true});
    // 2.执行npm install   注意后面是地址，就是将下载的内容放在新创建的文件夹下面，
    //      2.2在window电脑上，终端实际执行的是'npm.cmd'，而使用代码则不会自动添加'.cmd'
    const command = process.platform == 'win32' ? 'npm.cmd':'npm'
    await commandSpawn(command,['install'],{cwd:`./${project}`})
    // 3.运行 npm run serve
    commandSpawn(command,['run','serve'],{cwd:`./${project}`})
    // 4.打开浏览器 注意因为运行 npm run serve 时，进程是不会结束的，
    // 所以要去掉await,避免代码阻塞，然后直接打开浏览器，其热更新，会在npm run serve加载完后，自动显示
    open('http://localhost:8080/')
}

// 创建组件  dest是路径
const creatCpn = async (name,dest)=>{
    // 1.编写对应的ejs模板
    // 2.编译ejs模板，result
    const result = await compile('component.vue.ejs',{name,lowerName:name.toLowerCase()})
    console.log(result);
    // 3。将result放入到 .vue文件中
    const failPath = path.resolve(dest,`${name}.vue`)
    writeToFile(failPath,result)
    // 4。将文件放到对应的文件夹
}

// 添加组件和路由
const addPageAndRoute = async (name,dest) =>{
    // 编译组件和路由
    const pageResult = await compile('component.vue.ejs',{name,lowerName:name.toLowerCase()})
    const routeResult = await compile('router.vue.ejs',{name,lowerName:name.toLowerCase()})
    // console.log(routeResult);
    // 写入文件
    // 判断path是否存在，若不存在，则创建对应的文件夹 若父文件不存在，则依次创建父文件、子文件，使用递归
    const destAll = path.resolve(dest,name) 
    if(createDirSync(destAll)){
        const pageTargetPath = path.resolve(destAll,`${name}.vue`)
        const routeTargetPath = path.resolve(destAll,'route.js')
        writeToFile(pageTargetPath,pageResult)
        writeToFile(routeTargetPath,routeResult)
    }
}
// 添加store
const addStore = async (name,dest) =>{
    // 编译文件
    const storeTarget = await compile('store.vue.ejs',{})
    const storeTypeTarget = await compile('vuex-typoes.vue.ejs',{})

    // 创建文件夹，并写入文件
    const destAll = path.resolve(dest,name) 
    if(createDirSync(destAll)){
        const storeTargetPath = path.resolve(destAll,`${name}.js`)
        const storeTypeTargetPath = path.resolve(destAll,'types.js')
        writeToFile(storeTargetPath,storeTarget)
        writeToFile(storeTypeTargetPath,storeTypeTarget)
    }
}
module.exports = {
    creatActions,
    creatCpn,
    addPageAndRoute,
    addStore
}
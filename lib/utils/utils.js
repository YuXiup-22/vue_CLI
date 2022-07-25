const ejs = require('ejs')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

const compile = (template,data) => {
    // 找到编译模板的地址
    const templatePosition = `../template/${template}`
    const templatePath = path.resolve(__dirname,templatePosition)
    // console.log(templatePath);  拿到对应的正确路径
    return new Promise((resolve,reject)=>{
        ejs.renderFile(templatePath,{data},{},(err,result)=>{
            if(err){
                console.log(err);
                return
            }
            resolve(result)
        })
    })
    
}
const createDirSync = (pathName) => {
    console.log(pathName);
    if(fs.existsSync(pathName)){
        return true
    } else {
        // 如果该路径的上级父路径文件夹中有返回true，创建子路径文件；
        // 若没有，则不会返回true，而是继续递归到路径最前方，到最前方就到根路径，项目文件夹
        if(createDirSync(path.dirname(pathName))){
            fs.mkdirSync(pathName)
            return true
        }
    }
}

const writeToFile = (path,content) =>{
    // 返回的是一个promise,导出判断是否完成
    return  fs.promises.writeFile(path,content)
    
}
module.exports={
    compile,
    writeToFile,
    createDirSync
}
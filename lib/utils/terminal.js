/**
 * 执行终端命令相关的代码
 */

// 子进程，因为目前正在create，所以需要开启一个子进程，去执行其他的命令
const {spawn} = require('child_process')

const commandSpawn = (...args)=>{
    return new Promise((resolve,err)=>{
        const child_process = spawn(...args)
        // 在子进程中执行命令，我们需要将信息展示到主进程上，用户可以看到当前执行的进度
        // 表示子进程中的输出流，在process中显示，包括错误信息
        child_process.stdout.pipe(process.stdout)
        child_process.stderr.pipe(process.stderr)
        // 监听是否执行完毕，若执行完成后，要告知actions.js中的步骤，执行完成，开启后面的执行
        child_process.on('close',()=>{
            resolve()
        })
    })
}

module.exports = {
    commandSpawn
}
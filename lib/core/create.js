const program = require('commander')
const {creatActions,creatCpn,addPageAndRoute,addStore} = require('./actions')

const creatCommand = () =>{
    //  yuxi create project指令
    program
        .command('create <project> [others...]')
        .description('clone registry into a folder')
        // .action((project,others)=>{
        //     console.log(project,others);
        // })
        .action(creatActions)

    // yuxi addcpn project -d src/component
    program
        .command('addcpn <name>')
        .description('add vue component,例如：yuxi addcpn component [-d src/component]')
        .action((name)=>{
            // 传入添加文件的文件名和地址，
            creatCpn(name,program.dest || 'src/components')
        })
    // yuxi addPage pageName -d src/pages
    program
        .command('addpage <page>')
        .description('add vue page,例如：yuxi addpage pageName [-d src/pages]')
        .action((page)=>{
            // 传入添加文件的文件名和地址，
            addPageAndRoute(page,program._optionValues.dest || 'src/pages')
        })
    // yuxi addstore storeName
    program
    .command('addstore <store>')
    .description('add vuex,例如：yuxi addstore storeName [-d src/pages] ')
    .action((store)=>{
        // 传入添加文件的文件名和地址，
        addStore(store,program._optionValues.dest || 'src/store')
    })
}

module.exports = creatCommand

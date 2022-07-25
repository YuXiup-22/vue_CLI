const program = require('commander')

const helpOptions = () => {
    program.option('-w, --why','add Option Test')
    // 地址命令
    program.option('-d, --dest <dest>','a destination folder,例如：-d /src/component')

    program.on('--help',function () {
        console.log('help');
    })

    
}

module.exports = helpOptions
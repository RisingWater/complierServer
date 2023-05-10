let Service = require('node-windows').Service;
 
let svc = new Service({
    name: 'Complier Server',
    description: '编译服务器',
    script: 'D:/code/complierServer/index.js'
});
 
svc.on('install', () => {
    svc.start();
});
 
svc.install();
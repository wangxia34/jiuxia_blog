/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};
    
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1578381011912_9718';
    
    // add your middleware config here
    config.middleware = [];
    
    // MySQL数据库
    config.mysql = {
        // database configuration
        client: {
            // host
            host: '49.235.114.228',
            // port
            port: '3306',
            // username
            user: 'root',
            // password
            password: 'capsheaf#8686',
            // database
            database: 'jiuxia',
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };
    
    // 跨域问题
    config.security = {
        csrf: {enable: false},
        domainWhiteList: ['http://49.235.114.228','http://49.235.114.228:3000','http://192.168.160.43:3000', 'http://192.168.160.43:3001']
    };
    config.cors = {
        credentials: true,  //允许Cook可以跨域
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };
    
    config.static = {
        prefix: "/",
        dir: path.join(appInfo.baseDir, 'app/public'),
        dynamic: true,
        preload: false,
        maxAge: 0,
        buffer: false,
    };
    
    
    
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    
    return {
        ...config,
        ...userConfig,
    };
};
